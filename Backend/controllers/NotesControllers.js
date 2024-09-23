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
        console.error('Database Error:', err);
        res.status(500).json({ message: 'Database Error' });    }
};

const getnotesbyid = async (req, res) => {
    const { id } = req.query
    
    if (!id) {
        res.status(500).json({ message: 'Id is required' })
        return
    }

    const query = `SELECT * FROM Notes WHERE is_deleted = 0 AND id = @id`
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

const updatenotes = async (req, res) => {
    const { id, note_title, note_description, is_important } = req.body

    if (!id) {
        res.status(500).json({message: 'Id is required'})
    }

    const query = `UPDATE Notes SET note_title = @note_title,note_description = @note_description, is_important = @is_important WHERE id = @id`
    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('note_title', sql.VarChar, note_title)
            .input('note_description', sql.VarChar, note_description)
            .input('is_important', sql.Bit, is_important)
            .query(query);
        res.status(200).json({message: 'Note is succesfully updated' , button_name: 'Okay good'});
    } catch (err) {
        console.error('Database Error:', err);
        res.status(500).json({ message: 'Database Error' });
    }
}

const createnotes = async (req, res) => {
    const { note_title, note_description, is_important } = req.body;

    const query = `INSERT INTO Notes (note_title,note_description,is_important,is_deleted) VALUES(@note_title,@note_description,@is_important,0)`
    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('note_title', sql.VarChar, note_title)
            .input('note_description', sql.VarChar, note_description)
            .input('is_important', sql.Bit, is_important)
            .query(query);
        res.status(201).json({message: 'Note is created succesfully' , button_name: 'Okay Good'});
    } catch (err) {
        console.error('Database Error:', err);
        res.status(500).json({ message: 'Database Error' });    }
}

const deletenotes = async (req, res) => {
    const { id } = req.body
    const query = `UPDATE Notes SET is_deleted = 1 WHERE id = @id`

    if (!id) {
        res.status(500).json({ message: 'ID is required' })
        return;
    }

    try {
        const pool = await getPool();

        console.log('Executing query:', query);

        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(query);
        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Note is deleted' });
        } else {
            res.status(404).json({ message: 'Note is not found' });
        }
    } catch (err) {
        console.error('Database Error:', err);
        res.status(500).json({ message: 'Database Error' });
    }
};

const notesimportant = async (req, res) => {
    const query = `SELECT * FROM Notes WHERE is_deleted = 0 AND is_important = 1`;
    try {
        const pool = await getPool();

        const result = await pool.request().query(query);

        if (result.recordset.length > 0) {
            res.status(200).json({ important_notes: true });
        } else {
            res.status(200).json({ important_notes: false });
        }
    } catch (err) {
        console.error('Database Error:', err);
        res.status(500).json({ message: 'Database Error' });
    }
};



module.exports = { getnotes, getnotesbyid, updatenotes, createnotes, deletenotes, notesimportant }