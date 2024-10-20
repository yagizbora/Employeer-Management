const { query } = require('express');
const { getPool } = require('../database');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../Middleware/verifyToken'); 


const register = async (req, res) => {
    const tokenCheck = await verifyToken(req);
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Þifreyi hashle
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const query = `INSERT INTO Users (username, password,is_aktif) VALUES (@username, @password,1)`;
        const pool = await getPool();
        await pool.request()
            .input('username', sql.VarChar, username)
            .input('password', sql.VarChar, hashedPassword)
            .query(query);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Database error: ' + error.message });
    }
};



const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM Users WHERE username = @username AND is_aktif = 1');

        const user = result.recordset[0];

        // Kullanýcý mevcut deðilse hata ver.
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Þifreyi doðrula.
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Kullanýcý doðrulandýktan sonra token oluþtur.
        const token = jwt.sign({ id: user.id, username: user.username }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });

        // Mevcut kullanýcý için token'ý güncelle.
        await pool.request()
            .input('token', sql.VarChar, token)
            .input('id', sql.Int, user.id)
            .query('UPDATE Users SET token = @token WHERE id = @id');

        // Token'ý kullanýcýya geri döndür.
        res.status(200).json({ message: 'Login successful', token: token, user_id:user.id,username: user.username });
    } catch (error) {
        res.status(500).json({ message: 'Database error: ' + error.message });
    }
};






module.exports =
{
    login,
    register
}