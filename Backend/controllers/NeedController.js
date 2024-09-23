const { query } = require('express');
const { getPool } = require('../database');
const sql = require('mssql');


const getneed = async (req, res) => {


    const query = `SELECT n.*, e.Name,d.Departman AS Departmant,p.priority AS Priority FROM Need n JOIN Employeer_List e ON e.id = n.employeer_id JOIN Departmants d ON d.id = n.departman_id JOIN Priority p ON p.id = n.priority_id WHERE is_deleted = 0 ORDER BY n.priority_id ASC`

    try {
        const pool = await getPool();
        const result = await pool.request()
            .query(query);
        res.status(200).json({ data: result.recordset });
    } catch (err) {
        console.error('Database Error:', err);
        res.status(500).json({ message: 'Database Error' });    }
};



const getPriority = async (req, res) => {
    const query = `SELECT * FROM Priority`

    try {
        const pool = await getPool();
        const result = await pool.request()
            .query(query)
        res.status(200).json({ data: result.recordset })
    } catch (err) {
        console.error('Database Error:', err);
        res.status(500).json({ message: 'Database Error' });    }
}

const createneed = async (req, res) => {
    const { need_title, need_description, need_subject, employeer_id, departman_id, priority_id } = req.body;

    if (Object.keys(req.body).length < 5 ) {
        res.status(500).json({ message: 'All fields must be required' })
        return
    }

    const query = `INSERT INTO Need (need_title,need_description,need_subject,employeer_id,departman_id,priority_id,is_deleted) VALUES (@need_title,@need_description,@need_subject,@employeer_id,@departman_id,@priority_id,0)`
    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('need_title', sql.VarChar, need_title)
            .input('need_description', sql.VarChar, need_description)
            .input('need_subject', sql.VarChar, need_subject)
            .input('employeer_id', sql.Int, employeer_id, employeer_id)
            .input('departman_id', sql.Int, departman_id)
            .input('priority_id', sql.Int, priority_id)
            .query(query)
        res.status(201).json({ message: 'Request created succesfully' });
    } catch (err) {
        console.error('Database Error:', err);
        res.status(500).json({ message: 'Database Error' });    }
}


const getneedbyid = async (req, res) => {
    const { id } = req.query;

    if (!id) {
        res.status(400).json({ message: 'Id is required' })
        return
    }

    const query = `SELECT n.*, e.Name AS employeer_name ,d.Departman AS Departmant,p.priority AS Priority FROM Need n JOIN Employeer_List e ON e.id = n.employeer_id JOIN Departmants d ON d.id = n.departman_id JOIN Priority p ON p.id = n.priority_id WHERE is_deleted = 0 AND n.id = @id`
    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(query);
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Database Error:', err);
        res.status(500).json({ message: 'Database Error' });    }
}

const updateneedbyid = async (req, res) => {
    const { id, need_title, need_description, need_subject, employeer_id, departman_id, priority_id } = req.body 


    if (Object.keys(req.body).length < 6) {
        res.status(500).json({ message: 'All fields must be required' })
        return
    }

    const query = `UPDATE Need SET need_title = @need_title, need_subject = @need_subject, employeer_id = @employeer_id,
                   departman_id = @departman_id, priority_id = @priority_id  WHERE id = @id`

    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('need_title', sql.VarChar, need_title)
            .input('need_description', sql.VarChar, need_description)
            .input('need_subject', sql.VarChar, need_subject)
            .input('employeer_id', sql.Int, employeer_id, employeer_id)
            .input('departman_id', sql.Int, departman_id)
            .input('priority_id', sql.Int, priority_id)
            .query(query)
        res.status(201).json({ message: 'Request is changed' });

    } catch (err) {
        console.error('Database Error:', err); 
        res.status(500).json({ message: 'Database Error' });
    }
}

const deleteneedbyid = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        res.status(400).json({ message: 'Id is required' });
        return;
    }

    const query = `UPDATE Need SET is_deleted = 1 WHERE id = @id`;

    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(query);

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Request is deleted' });
        } else {
            res.status(404).json({ message: 'Request is not found' });
        }
    } catch (err) {
        console.error('Database Error:', err); // Hata günlüğü için
        res.status(500).json({ message: 'Database Error' });
    }
}

module.exports = { getneed, createneed, getPriority, getneedbyid, deleteneedbyid, updateneedbyid }