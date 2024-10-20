const sql = require('mssql'); // MSSQL i�in mssql paketini kullan
const { getPool } = require('../database'); // Veritaban� ba�lant� fonksiyonunu i�e aktar

const verifyToken = async (req) => {
    const token = req.headers['token']; // Token'� ba�l�ktan al

    if (!token) {
        return { status: false, message: 'No token provided.' };
    }

    try {
        const pool = await getPool(); // Veritaban� ba�lant�s�n� al
        const query = `SELECT * FROM Users WHERE token = @token AND is_aktif = 1`;

        const result = await pool.request()
            .input('token', sql.VarChar, token) // Token'� sorguya ekle
            .query(query);

        // E�er kullan�c� bulunursa
        if (result.recordset.length > 0) {
            return { status: true, user: result.recordset[0] }; // Kullan�c� bilgilerini d�nd�r
        } else {
            return { status: false, message: 'Invalid token or user is inactive.' };
        }
    } catch (err) {
        console.error('Database error:', err);
        return { status: false, message: 'Database error.' };
    }
};

module.exports = verifyToken; // Fonksiyonu d��ar� aktar