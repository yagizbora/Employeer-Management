const { query } = require('express');
const { getPool } = require('../database');
const sql = require('mssql');


const getnotes = async (req, res) => {

    const query = `SELECT * FROM Notes WHERE is_deleted = 0`
    try {
        const pool = await getPool();
        const result = await pool.request()
            .query(query);
        res.status(200).json({ data: result.recordset });
    } catch (err) {
        res.status(500).json({ message: 'Veritaban? hatas?: ' + err.message });
    }
};



module.exports = { getnotes }