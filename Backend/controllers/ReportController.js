const { query } = require('express');
const { getPool } = require('../database');
const sql = require('mssql');


const SalaryAverageAndAllinDepartmans = async (req, res) => {
    try {
        const pool = await getPool();

        // Ortalama ve Toplam Maa�lar� Getir
        const avgAndTotalResult = await pool.request().query(`
            SELECT 
            d.Departman AS Departman,
            AVG(CAST(e.Salary AS DECIMAL(10, 2))) AS AverageSalary,
            SUM(CAST(e.Salary AS DECIMAL(10, 2))) AS TotalSalary
            FROM 
            Employeer_List e
            JOIN 
            Departmants d ON e.departmant_id = d.id
            WHERE 
            e.IS_DELETED = 0
            GROUP BY 
            d.Departman;
        `);

        // Çalışan Detaylarını Getir
        const employeeDetailsResult = await pool.request().query(`
            SELECT 
            e.Name AS Name,
            e.Salary AS Salary,
            e.Position AS Position,
            d.Departman AS Departman
            FROM 
            Employeer_List e
            JOIN 
            Departmants d ON e.departmant_id = d.id
            WHERE 
            e.IS_DELETED = 0;
        `);

        // JSON format�nda veri olu�turma
        const departments = {};
        avgAndTotalResult.recordset.forEach(row => {
            departments[row.Departman] = {
                AverageSalary: row.AverageSalary,
                TotalSalary: row.TotalSalary,
                Employeers: []
            };
        });

        employeeDetailsResult.recordset.forEach(row => {
            if (departments[row.Departman]) {
                departments[row.Departman].Employeers.push({
                    Name: row.Name,
                    Salary: row.Salary,
                    Position: row.Position
                });
            }
        });

        const response = Object.keys(departments).map(dept => ({
            Departman: dept,
            AverageSalary: departments[dept].AverageSalary,
            TotalSalary: departments[dept].TotalSalary,
            Employeers: departments[dept].Employeers
        }));

        res.json(response);
    } catch (err) {
        res.status(500).json({ message: 'Veritaban� hatas�: ' + err.message });
    }
};

const getSalaryStatistics = async (req, res) => {
    try {
        const pool = await getPool();
        const result = await pool.request().query(`
            SELECT 
            d.Departman AS Departman,
            AVG(CAST(e.Salary AS DECIMAL(10, 2))) AS AverageSalary,
            SUM(CAST(e.Salary AS DECIMAL(10, 2))) AS TotalSalary
            FROM 
            Employeer_List e
            JOIN 
            Departmants d ON e.departmant_id = d.id
            WHERE 
            e.IS_DELETED = 0
            GROUP BY 
            d.Departman
        `);

        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Veritaban� hatas�: ' + err.message });
    }
};


module.exports = {
    SalaryAverageAndAllinDepartmans, getSalaryStatistics
}