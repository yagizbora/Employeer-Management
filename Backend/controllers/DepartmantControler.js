const { query } = require('express');
const { getPool } = require('../database');
const sql = require('mssql');
const verifyToken = require('../Middleware/verifyToken'); 


const createDepartmant = async (req, res) => {
    const tokenCheck = await verifyToken(req); // Token kontrolünü asenkron olarak yap
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }
    const { departman } = req.body;

    if (!departman ) {
        return res.status(500).send('All fields Required!');
    }

    try {
        const pool = await getPool();
        await pool.request()
            .input('departman', sql.NVarChar, departman)
            .query('INSERT INTO Departmants (Departman,IS_DELETED) VALUES (@departman , 0)');
        res.status(200).json({ message: 'Departmant Added' });
    } catch (err) {
        res.status(500).json({ error: 'Veritabanı hatası: ' + err.message });
    }
};

const updatedepartmantbyId = async (req, res) => {
    const tokenCheck = await verifyToken(req); // Token kontrolünü asenkron olarak yap
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }
    const { id, departman } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    if (!departman) {
        return res.status(400).json({ message: 'Departman is required' });
    }

    try {
        const pool = await getPool();
        await pool.request()
            .input('id', sql.Int, id)
            .input('departman', sql.NVarChar, departman)
            .query('UPDATE Departmants SET Departman = @departman WHERE id = @id');
        res.status(200).json({ message: 'Departman Updated' });

    } catch (err) {
        res.status(500).json({ message: 'Veritabanı hatası: ' + err.message });
    }
}


const getdepartmants = async (req, res) => {
    const tokenCheck = await verifyToken(req); // Token kontrolünü asenkron olarak yap
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }
        try {
            const pool = await getPool();
            const result = await pool.request()
                .query('SELECT * FROM Departmants WHERE IS_DELETED = 0 ORDER BY id ASC;');
            res.json({ data: result.recordset });
        } catch (err) {
            res.status(500).json({ message: 'Veritabanı hatası: ' + err.message });
        }
    }
        
const getdepartmantById = async (req, res) => {
    const tokenCheck = await verifyToken(req); // Token kontrolünü asenkron olarak yap
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }
        const id = req.params.id;

        if (!id) {
            res.status(500).send('Id is required')
        }
        try {
            const pool = await getPool();
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM Departmants WHERE id = @id AND IS_DELETED = 0;');
            res.json(result.recordset[0]);
        } catch (err) {
            res.status(500).send('Veritabanı hatası: ' + err.message);
        }
};


const deleteDepartmantById = async (req, res) => {
    const tokenCheck = await verifyToken(req); // Token kontrolünü asenkron olarak yap
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }
    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('UPDATE Departmants SET IS_DELETED = 1 WHERE id = @id');

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Employeer is deleted' });
        } else {
            res.status(404).json({ message: 'Employeer is not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Veritabanı hatası: ' + err.message });
    }
};



module.exports = {
    getdepartmants,
    getdepartmantById,
    deleteDepartmantById,
    createDepartmant,
    updatedepartmantbyId
}