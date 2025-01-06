const { getPool } = require('../database');
const sql = require('mssql');
const verifyToken = require('../Middleware/verifyToken'); 

const getprojects = async (req, res) => {
    const tokenCheck = await verifyToken(req); // Token kontrolünü asenkron olarak yap
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }

    const query = `SELECT p.* , c.customer_address,c.customer_company,c.customer_email,c.customer_name,c.customer_phone,c.is_important_customer
FROM Project p JOIN Customer c ON c.id = p.customer_name_id WHERE p.is_deleted = 0 AND c.is_deleted = 0`
    try {
        const pool = await getPool();
        const result = await pool.request()
            .query(query);
        res.status(200).json({ data: result.recordset });
    } catch (err) {
        res.status(500).json({ message: 'Veritaban? hatas?: ' + err.message });
    }
}

const createprojects = async (req, res) => {
    const tokenCheck = await verifyToken(req); 
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }
    const { customer_id, project_name, project_web_url } = req.body;

    const query = `INSERT INTO Project(customer_name_id,project_name,project_web_url,is_deleted) VALUES(@customer_id,@project_name,@project_web_url,0)`
    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('customer_id', sql.Int, customer_id)
            .input('project_name', sql.VarChar, project_name)
            .input('project_web_url', sql.VarChar, project_web_url)
            .query(query);
        res.status(201).json({message:'Project created successfully'});
    } catch (err) {
        res.status(500).json({ message: 'Veritaban? hatas?: ' + err.message });
    }
}

const updateprojects = async (req, res) => {
    const tokenCheck = await verifyToken(req); // Token kontrolünü asenkron olarak yap
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }
        const { customer_name_id, project_name, project_web_url,id } = req.body;

        //console.log(customer_name_id)

        const query = `UPDATE Project SET customer_name_id = @customer_name_id, project_name = @project_name,project_web_url = @project_web_url WHERE id = @id`
        try {
            const pool = await getPool();
            const result = await pool.request()
                .input('customer_name_id', sql.Int, customer_name_id)
                .input('project_name', sql.VarChar, project_name)
                .input('project_web_url', sql.VarChar, project_web_url)
                .input('id', sql.Int, id)
                .query(query);
            res.status(200).json({ message: 'Project Updated' });
 
        } catch (err) {
            res.status(500).json({ message: 'Veritaban? hatas?: ' + err.message });
        }
    }

const getprojectsbyid = async (req, res) => {
    const tokenCheck = await verifyToken(req); // Token kontrolünü asenkron olarak yap
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }
    const { id } = req.query

    //const query = `
    //SELECT p.* , c.customer_name AS customer_name
    //FROM Project p JOIN Customer c ON c.id = p.customer_name_id WHERE p.is_deleted = 0 AND c.is_deleted = 0 AND p.id = @id`
    const query = `SELECT * FROM Project WHERE id = @id`
    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int,id)
            .query(query);
        res.status(200).json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Veritaban? hatas?: ' + err.message });
    }
}



const deleteprojectsbyid = async (req, res) => {
    const tokenCheck = await verifyToken(req); 
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }
    const { id } = req.body

    const query = `UPDATE Project SET is_deleted = 1 WHERE id = @id`
    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(query);
        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Project is deleted' });
        } else {
            res.status(404).json({ message: 'Project is not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Veritaban? hatas?: ' + err.message });
    }
}

module.exports =
{
    getprojects,
    getprojectsbyid,
    deleteprojectsbyid,
    createprojects,
    updateprojects
};