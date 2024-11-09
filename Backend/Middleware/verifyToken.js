const jwt = require('jsonwebtoken');
const sql = require('mssql');
const { getPool } = require('../database');

const verifyToken = async (req) => {
    const token = req.headers['token'];
    const userId = req.headers['user_id']; // Fix: access 'user_id' correctly

    if (!token || !userId) { // Check both token and userId
        return { status: false, message: 'Token or user ID not provided.' };
    }

    try {
        // Decode and verify token
        const decoded = jwt.verify(token, 'YOUR_SECRET_KEY');

        // Establish a connection with the database
        const pool = await getPool();

        // Correct SQL syntax and use proper placeholders
        const query = `
            SELECT * FROM Users 
            WHERE token = @token AND id = @user_id AND is_aktif = 1 AND is_logged = 1
        `;
        const result = await pool.request()
            .input('token', sql.VarChar, token)
            .input('user_id', sql.Int, userId) // Use 'userId' variable
            .query(query);

        if (result.recordset.length > 0) {
            return { status: true, user: result.recordset[0] };
        } else {
            return { status: false, message: 'Invalid token or user is inactive.' };
        }
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            // Update user status and token if the token is expired
            const query = `UPDATE Users SET token = '', is_logged = 0 WHERE token = @token`;
            const pool = await getPool();
            await pool.request()
                .input('token', sql.VarChar, token)
                .query(query);
            return { status: false, message: 'Session expired, please log in again.' };
        } else {
            console.error(error);
            return { status: false, message: 'Failed to authenticate token.' };
        }
    }
};


module.exports = verifyToken;
