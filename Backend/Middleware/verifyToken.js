const jwt = require('jsonwebtoken');
const sql = require('mssql');
const { getPool } = require('../database');

const verifyToken = async (req) => {
    const token = req.headers['token'];

    if (!token) {
        return { status: false, message: 'No token provided.' };
    }

    try {
        const decoded = jwt.verify(token, 'YOUR_SECRET_KEY'); 

        const pool = await getPool();
        const query = `SELECT * FROM Users WHERE token = @token AND is_aktif = 1`;

        const result = await pool.request()
            .input('token', sql.VarChar, token)
            .query(query);

        if (result.recordset.length > 0) {
            return { status: true, user: result.recordset[0] };
        } else {
            return { status: false, message: 'Invalid token or user is inactive.' };
        }
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            const pool = await getPool();
            await pool.request()
                .input('token', sql.VarChar, token)
                .query('UPDATE Users SET token = NULL WHERE token = @token');

            return { status: false, message: 'Session expired, please log in again.' };
        } else {
            console.error('Token verification error:', error);
            return { status: false, message: 'Failed to authenticate token.' };
        }
    }
};

module.exports = verifyToken;
