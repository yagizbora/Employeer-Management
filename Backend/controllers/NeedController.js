const { query } = require('express');
const { getPool } = require('../database');
const sql = require('mssql');


const getneed = async (req, res) => {
    const query = `SELECT n.*, e.Name,d.Departman AS Departmant FROM Need n JOIN Employeer_List e ON e.id = n.employeer_id JOIN Departmants d ON d.id = n.departman_id WHERE is_deleted = 0`

    try {
        const pool = await getPool();
        const result = await pool.request()
            .query(query);
        res.status(200).json({ data: result.recordset });
    } catch (err) {
        res.status(500).json({ message: 'Veritaban� hatas�: ' + err.message });
    }
};

const creatneed = async (req, res) => {
    const { need_title, need_description, need_subject, employeer_id, departman_id } = req.body;

    if (Object.keys(req.body).length < 4 ) {
        res.status(500).json({ message: 'All fields must be required' })
        return
    }

    const query = `INSERT INTO Need (need_title,need_description,need_subject,employeer_id,departman_id,is_deleted) VALUES (@need_title,@need_description,@need_subject,@employeer_id,@departman_id,0)`
    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('need_title', sql.VarChar, need_title)
            .input('need_description', sql.VarChar, need_description)
            .input('need_subject', sql.VarChar, need_subject)
            .input('employeer_id', sql.Int, employeer_id, employeer_id)
            .input('departman_id', sql.Int, departman_id)
            .query(query)
        res.status(201).json({ message: 'Request created succesfully' });
    } catch (err) {
        res.status(500).json({ message: 'Veritabanı Hatası' + err.message });
    }
}



module.exports = { getneed, creatneed }