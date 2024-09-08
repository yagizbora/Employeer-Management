const { query } = require('express');
const { getPool } = require('../database');
const sql = require('mssql');


const getcomplaints = async (req, res) => {

    const query = `SELECT c.*,e.Name AS Employeer_Name FROM Complaint c JOIN Employeer_List e ON c.employeer_id = e.id WHERE c.is_deleted = 0`
    try {
        const pool = await getPool();
        const result = await pool.request()
        .query(query);
        res.status(200).json({ data: result.recordset });
    } catch (err) {
        res.status(500).json({ message: 'Veritaban? hatas?: ' + err.message });
    }
}
const createcomplaints = async (req, res) => {
    const { employeer_id, complaint_title, complaint_description } = req.body

    const query = `INSERT INTO Complaint (employeer_id,complaint_title,complaint_description,IS_DELETED) VALUES  (@employeer_id,@complaint_title,@complaint_description,0)`;
    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('employeer_id', sql.Int, employeer_id)
            .input('complaint_title', sql.VarChar, complaint_title)
            .input('complaint_description',sql.VarChar,complaint_description)
        .query(query);
        res.status(201).json({ message: 'Order ba?ar?yla olu?turuldu.' });

    } catch (err) {
        res.status(500).json({ message: 'Veritaban? hatas?: ' + err.message });
    }
};


module.exports = { getcomplaints, createcomplaints };