const { query } = require('express');
const { getPool } = require('../database');
const sql = require('mssql');



const getcustomer = async (req, res) => {
    const { is_important_customer } = req.body

    if (is_important_customer === undefined || is_important_customer === null) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }

    let sql = ''; 

    if (is_important_customer == true) {
        sql += `   AND is_important_customer = 1  `
    }
    if (is_important_customer == false) {
        sql += `    AND is_important_customer = 0   `
    }
    

    const query = `SELECT * FROM Customer WHERE is_deleted = 0 ${sql} ORDER BY id ASC`

    try {
        const pool = await getPool();
        const result = await pool.request()
        .query(query);
        res.status(200).json({ data: result.recordset });

    }
    catch (err) {
        res.status(500).json({ message: 'Veritaban? hatas?: ' + err.message });
    }
}

const addcustomer = async (req, res) => {
    const { customer_name, customer_address, customer_phone, customer_company, customer_email, is_important_customer } = req.body

    if (Object.keys(req.body).length < 5) {
        res.status(500).json({ message: 'All fields must be required' })
        return
    }

    const query = `INSERT INTO Customer(customer_name,customer_address,customer_phone,customer_company,customer_email,is_important_customer,is_deleted) VALUES(@customer_name,@customer_address,@customer_phone,@customer_company,@customer_email,@is_important_customer,0)`
    try
    {
        const pool = await getPool();
        const result = await pool.request()
            .input('customer_name', sql.VarChar, customer_name)
            .input('customer_address', sql.VarChar, customer_address)
            .input('customer_company', sql.VarChar,customer_company)
            .input('customer_phone', sql.VarChar, customer_phone)
            .input('customer_email', sql.VarChar, customer_email)
            .input('is_important_customer', sql.Bit, is_important_customer)
            .query(query)
        res.status(201).json({ message: 'Customer created is succesfully' });

    } catch (error) {
            res.status(500).json({ message: 'Veritaban? hatas?: ' + err.message });
    }
}

const deletecustomerbyid = async (req, res) => {
    const { id, is_important_customer } = req.body

    if (!id || is_important_customer === undefined || is_important_customer === null) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }

    if (is_important_customer == true) {
        res.status(400).json({ message: 'You cannot delete this customer please contact IT departmant' })
        return
    } 

    const query = `UPDATE Customer SET is_deleted = 1 WHERE id = @id AND is_important_customer = 0 `; 
    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(query)
        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Customer is deleted' });
        } else {
            res.status(404).json({ message: 'Customer is not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Veritaban? hatas?: ' + error.message });
    }
}

const getcustomerbyid = async (req, res) => {
    const { id } = req.query

    if (!id) {
        res.status(500).json({ message: 'Id is required' })
        return
    }
    const query = `SELECT * FROM Customer WHERE is_deleted = 0 AND id = @id`
    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(query)
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Veritaban? hatas?: ' + err.message });
    }
}

const updatecustomerbyid = async (req, res) => {
    const { id, customer_name, customer_address, customer_phone, customer_company, customer_email } = req.body

    if (Object.keys(req.body).length < 6) {
        res.status(500).json({ message: 'All fields must be required' })
        return
    }

    const query = `UPDATE Customer SET customer_name = @customer_name, customer_address = @customer_address, customer_phone = @customer_phone, customer_company = @customer_company,
    customer_email = @customer_email WHERE id = @id`
    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('customer_name', sql.VarChar, customer_name)
            .input('customer_address', sql.VarChar, customer_address)
            .input('customer_company', sql.VarChar, customer_company)
            .input('customer_phone', sql.VarChar, customer_phone)
            .input('customer_email', sql.VarChar, customer_email)
            .query(query)
        res.status(200).json({ message: 'Complaint Updated' });

    } catch (error) {
        res.status(500).json({ message: 'Veritaban? hatas?: ' + error.message });
    }
}



module.exports =
{
    getcustomer,
    addcustomer,
    getcustomerbyid,
    deletecustomerbyid,
    updatecustomerbyid
}