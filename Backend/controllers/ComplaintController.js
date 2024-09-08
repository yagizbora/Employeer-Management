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

    if (Object.keys(req.body).length < 3) {
        res.status(500).json({ message: 'All fields must be required'})
        return
    }

    const query = `INSERT INTO Complaint (employeer_id,complaint_title,complaint_description,is_deleted) VALUES  (@employeer_id,@complaint_title,@complaint_description,0)`;
    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('employeer_id', sql.Int, employeer_id)
            .input('complaint_title', sql.VarChar, complaint_title)
            .input('complaint_description',sql.VarChar,complaint_description)
        .query(query);
        res.status(201).json({ message: 'Complaints creatd is succesfully' });

    } catch (err) {
        res.status(500).json({ message: 'Veritaban? hatas?: ' + err.message });
    }
};

const deletecomplaintsbyid = async (req, res) => {
    const { id } = req.body

    if (!id) {
        res.status(400).json({ message: 'Id is required' });
        return
    }

    const query = `UPDATE Complaint SET is_deleted = 1 WHERE id = @id`; 

    try {
        const pool = await getPool();
        const result = await pool.request()
        .input('id',sql.Int, id)
        .query(query);
        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Complaint is deleted' });
        } else {
            res.status(404).json({ message: 'Complaint is not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Veritabani hatasi: ' + err.message });
    }
}


module.exports = { getcomplaints, createcomplaints, deletecomplaintsbyid };