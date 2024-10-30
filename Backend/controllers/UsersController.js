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
    const { username, password,is_admin } = req.body;

    if (!username || !password || !is_admin == null) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // ?ifreyi hashle
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const query = `INSERT INTO Users (username, password,is_aktif,is_admin) VALUES (@username, @password,1,@is_admin)`;
        const pool = await getPool();
        await pool.request()
            .input('username', sql.VarChar, username)
            .input('is_admin', sql.Bit, is_admin)
            .input('password', sql.VarChar, hashedPassword)
            .query(query);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Database error: ' + error.message });
    }
};

const listusers = async (req, res) => {
    const tokenCheck = await verifyToken(req);
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }
    const query = `SELECT username,is_admin,id FROM Users WHERE is_aktif = 1`
    const pool = await getPool();
    const result = await pool.request()
        .query(query);
    res.status(200).json({data: result.recordset});
}

const changepassword = async (req, res) => {
    const tokenCheck = await verifyToken(req);
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }
    const { id, password } = req.body

    const query = `UPDATE Users SET password = @hashedpassword WHERE id = @id`
    try {
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('hashedpassword', sql.VarChar, hashedPassword)
            .query(query);

        const response = result
        if (response.rowsAffected[0] > 0) {
            return res.status(200).json({ message: 'Password changed successfully' })
        }
        else {
            res.status(404).json({ message: 'Something is wrong' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Database error: ' + error.message });
    }
}

const changeusername = async (req, res) => {
    const tokenCheck = await verifyToken(req);
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }
    const { id, username } = req.body;
    const query = `UPDATE Users SET username = @username WHERE id = @id`

    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('username', sql.VarChar, username)
            .query(query);

        const response = result
        if (response.rowsAffected[0] > 0) {
            return res.status(200).json({ message: 'Password changed successfully' })
        }
        else {
            res.status(404).json({ message: 'Something is wrong' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Database error: ' + error.message });
    }
};

const deactiveusers = async (req, res) => {
    const tokenCheck = await verifyToken(req);
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }
    const { id, user_id } = req.body

    const query = `UPDATE Users SET is_aktif = 0 WHERE id = @id`


    let checkadminstatus

    const checkuseradmin = async () => {
        const query = `SELECT is_admin FROM Users WHERE id = @user_id AND is_aktif = 1`
        const pool = await getPool();
        const result = await pool.request()
            .input('user_id', sql.Int, user_id)
            .query(query)
        return result.recordset.length > 0 ? result.recordset[0].is_admin : null;
    }

    try {
        checkadminstatus = await checkuseradmin();
        if (!checkadminstatus) {
            res.status(400).json({ message: "You're not admin you cannot delete this user!!" });
            return;
        }
        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(query)

        const response = result
        if (response.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Operation is succesfull ' })
        }
        else {
            res.status(404).json({ message: 'User is not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Database error: ' + error.message });
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ message: 'All fields is required' })
        return
    }
    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM Users WHERE username = @username AND is_aktif = 1');

        const user = result.recordset[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, 'YOUR_SECRET_KEY', { expiresIn: '90m' });

        await pool.request()
            .input('token', sql.VarChar, token)
            .input('id', sql.Int, user.id)
            .query('UPDATE Users SET token = @token WHERE id = @id');

        res.status(200).json({ message: 'Login successful', token: token, user_id: user.id, username: user.username, is_admin: user.is_admin });
    } catch (error) {
        res.status(500).json({ message: 'Database error: ' + error.message });
    }
};

const adminstatus = async (req, res) => {
    const tokenCheck = await verifyToken(req);
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }
    const { id, is_admin, user_id } = req.body
    const query = `UPDATE Users SET is_admin = @is_admin WHERE id = @id`


    let checkadminstatus

    const checkuseradmin = async () => {
        const query = `SELECT is_admin FROM Users WHERE id = @user_id AND is_aktif = 1`
        const pool = await getPool();
        const result = await pool.request()
            .input('user_id', sql.Int, user_id)
            .query(query)
        return result.recordset.length > 0 ? result.recordset[0].is_admin : null;
    }
    try {
        checkadminstatus = await checkuseradmin();
        if (!checkadminstatus) {
            res.status(400).json({message: "You're not admin you cannot delete this user!!" });
            return;
        }
        const pool = await getPool();
        const result = await pool.request()
            .input('id',sql.Int, id)
            .input('is_admin', sql.Bit, is_admin)
            .query(query);

        const response = result

        if (response.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Operation is succesfull ' })
        }
        else {
            res.status(404).json({ message: 'User is not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Database error: ' + error.message });
    }
}




module.exports =
{
    login,
    register,
    listusers,
    deactiveusers,
    adminstatus,
    changepassword,
    changeusername
}