const { getPool } = require('../database');
const sql = require('mssql');

const getEmployeers = async (req, res) => {
    try {
        const pool = await getPool();
        const result = await pool.request().query(`
            SELECT 
                e.*, 
                d.Departman AS Department 
            FROM 
                Employeer_List e
            LEFT JOIN 
                Departmants d ON e.departmant_id = d.id 
            WHERE 
                e.IS_DELETED = 0;
        `);
        res.json({ data: result.recordset });
    } catch (err) {
        res.status(500).json({ message: 'Veritabaný hatasý: ' + err.message });
    }
};


const getEmployeerById = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(500).send('Id is required');
    }

    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(`
                SELECT 
                    e.*, 
                    d.Departman AS Department 
                FROM 
                    Employeer_List e
                LEFT JOIN 
                    Departmants d ON e.departmant_id = d.id 
                WHERE 
                    e.id = @id AND e.IS_DELETED = 0
                ORDER BY e.id ASC
                   ;
            `);
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).send('Veritabaný hatasý: ' + err.message);
    }
};


const createEmployeer = async (req, res) => {
    const { name, position, salary, departmant_id } = req.body;

    try {
        const pool = await getPool();
        await pool.request()
            .input('name', sql.NVarChar, name)
            .input('position', sql.NVarChar, position)
            .input('salary', sql.Decimal(10, 2), salary)
            .input('departmant_id', sql.Int, departmant_id)
            .query(`
                INSERT INTO Employeer_List (Name, Position, Salary, IS_DELETED, departmant_id)
                VALUES (@name, @position, @salary, 0, @departmant_id)
            `);

        res.status(201).json({ message: 'Employee added successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Database error: ' + err.message });
        console.error(err)
    }
};


const updateemployeer = async (req, res) => {
    const { id, name, position, salary, departmant_id } = req.body;

    if (!id || !name || !position || !salary || !departmant_id) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('name', sql.NVarChar, name)
            .input('position', sql.NVarChar, position)
            .input('salary', sql.Int, salary)
            .input('departmant_id', sql.Int, departmant_id)
            .query(`
                UPDATE Employeer_List
                SET Name = @name,
                    Position = @position,
                    Salary = @salary,
                    departmant_id = @departmant_id
                WHERE id = @id;
            `);

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Employeer Updated' });
        } else {
            res.status(404).json({ message: 'Employeer Not Found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Veritabaný hatasý: ' + err.message });
    }
};




const deleteEmployeerById = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({message: 'ID is required'});
    }
    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('UPDATE Employeer_List SET IS_DELETED = 1 WHERE id = @id');

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({message: 'Employeer is deleted'});
        } else {
            res.status(404).json({message: 'Employeer is not found'});
        }
    } catch (err) {
        res.status(500).json({message: 'Veritabaný hatasý: ' + err.message});
    }
};


module.exports = {
    getEmployeers,
    getEmployeerById,
    createEmployeer,
    deleteEmployeerById,
    updateemployeer
};
