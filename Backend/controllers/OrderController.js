const { getPool } = require('../database');
const sql = require('mssql');

const getOrders = async (req, res) => {
    try {
        const pool = await getPool();
        const result = await pool.request()
            .query(`
                SELECT
                    o.id,
                    o.order_name,
                    o.order_description,
                    o.is_complated,
                    o.start_date,
                    o.end_date,
                    o.IS_DELETED,
                    e.Name AS employeer_name,
                    d.Departman AS departman_name
                FROM
                    [Order] o
                JOIN
                    Employeer_List e ON o.Employeer_id = e.id
                JOIN
                    Departmants d ON o.Departman_id = d.id
                WHERE
                    o.IS_DELETED = 0
            `);

        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Veritabaný hatasý: ' + err.message });
    }
};

module.exports = { getOrders };
