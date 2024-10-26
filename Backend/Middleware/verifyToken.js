const sql = require('mssql');
const { getPool } = require('../database'); 

const verifyToken = async (req) => {
    const token = req.headers['token']; 

    if (!token) {
        return { status: false, message: 'No token provided.' };
    }

    try {
        const pool = await getPool(); 
        const query = `SELECT * FROM Users WHERE token = @token AND is_aktif = 1`;

        const result = await pool.request()
            .input('token', sql.VarChar, token) 
            .query(query);

        // Eðer kullanýcý bulunursa
        if (result.recordset.length > 0) {
            return { status: true, user: result.recordset[0] }; 
        } else {
            return { status: false, message: 'Invalid token or user is inactive.' };
        }
    } catch (err) {
        console.error('Database error:', err);
        return { status: false, message: 'Database error.' };
    }
};

module.exports = verifyToken;