const { getPool } = require('../database');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../Middleware/verifyToken'); 
const { response } = require('express');


const register = async (req, res) => {
    const tokenCheck = await verifyToken(req);
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }

    const { username, password, is_admin } = req.body;

    
    if (!username || !password || is_admin == null) {
        return res.status(400).json({ message: 'Username, password, and is_admin are required'});
    }


    const checkUsernameQuery = async () => {
        const query = `SELECT COUNT(*) AS count FROM Users WHERE username = @username`;
        const pool = await getPool();
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query(query);
        return result.recordset[0].count; 
    };

    try {
        const usernameCount = await checkUsernameQuery(); 
        if (usernameCount > 0) {
            return res.status(500).json({ message: 'Username already exists, please use a different username' });
        }

        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const insertQuery = `INSERT INTO Users (username, password, is_aktif, is_admin) VALUES (@username, @password, 1, @is_admin)`;
        const pool = await getPool();
        await pool.request()
            .input('username', sql.VarChar, username)
            .input('is_admin', sql.Bit, is_admin)
            .input('password', sql.VarChar, hashedPassword)
            .query(insertQuery);

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

    const { is_logged } = req.body;

    if (is_logged === null || is_logged === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    let sqllogged = ""; // Change const to let
    if (is_logged !== null && is_logged !== undefined) {
        sqllogged += ` AND is_logged = @is_logged`;
    }

    const query = `SELECT username, is_admin, id, is_logged FROM Users WHERE is_aktif = 1${sqllogged}`;

    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('is_logged', sql.Bit, is_logged)
            .query(query);
        res.status(200).json({ data: result.recordset });
    } catch (error) {
        res.status(500).json({ message: 'Database error', error: error.message });
    }
};

const changepassword = async (req, res) => {
    const tokenCheck = await verifyToken(req);
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }

    const { id, password } = req.body;
    const query = `UPDATE Users SET password = @hashedpassword WHERE id = @id`;

    try {
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('hashedpassword', sql.VarChar, hashedPassword)
            .query(query);

        if (result.rowsAffected[0] > 0) {
            const resetTokenQuery = `UPDATE Users SET token = '' WHERE id = @id`;
            const tokenResult = await pool.request()
                .input('id', sql.Int, id)
                .query(resetTokenQuery);

            if (tokenResult.rowsAffected[0] > 0) {
                return res.status(200).json({ message: 'Password changed and token reset successfully.' });
            } else {
                return res.status(200).json({ message: 'Password changed, but failed to reset token.' });
            }
        } else {
            return res.status(404).json({ message: 'User ID not found or password not changed.' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Database error: ' + error.message });
    }
};

const changeusername = async (req, res) => {
    const tokenCheck = await verifyToken(req);
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }

    const { id, username } = req.body;
    const query = `UPDATE Users SET username = @username WHERE id = @id`;

    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('username', sql.VarChar, username)
            .query(query);

        if (result.rowsAffected[0] > 0) {
            const resettokenQuery = `UPDATE Users SET token = '' WHERE id = @id`;
            const tokenResult = await pool.request()
                .input('id', sql.Int, id)
                .query(resettokenQuery);

            if (tokenResult.rowsAffected[0] > 0) {
                return res.status(200).json({ message: 'Username changed and token reset successfully.' });
            } else {
                return res.status(200).json({ message: 'Username changed, but failed to reset token.' });
            }
        } else {
            return res.status(404).json({ message: 'Username not changed. User ID may not exist.' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Database error: ' + error.message });
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
            .query('UPDATE Users SET token = @token, is_logged = 1 WHERE id = @id');
        res.status(200).json({ message: 'Login successful', token: token, user_id: user.id, username: user.username, is_admin: user.is_admin });
    } catch (error) {
        res.status(500).json({ message: 'Database error: ' + error.message });
    }
};

const logout = async (req, res) => { 
    const tokenCheck = await verifyToken(req);
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }
    const { user_id } = req.body 
    if (!user_id) {
        res.status(400).json({ message: 'User ID is required' });
    }
    const query = `Update Users SET token = '' , is_logged = 0 WHERE id = @user_id AND is_aktif  = 1`
    try {
        const pool = await getPool();
        const result = await pool.request()
           .input('user_id', sql.Int, user_id)
            .query(query)
        if (result.rowsAffected[0] > 0) {
            const usercheckquery = `Select username from Users where id = @user_id AND is_aktif = 1`
            const userresult = await pool.request()
                .input('user_id', sql.Int, user_id)
                .query(usercheckquery)
            if (userresult.recordset.length > 0) {
                res.status(200).json({ message: 'User ' + userresult.recordset[0].username + ' logged out successfully' });
                return 
             }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Database error: '+ error.message });
    }
}

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
    logout,
    register,
    listusers,
    deactiveusers,
    adminstatus,
    changepassword,
    changeusername
}