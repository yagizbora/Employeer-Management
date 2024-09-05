const { getPool } = require('../database');
const sql = require('mssql');



const getOrders = async (req, res) => {
    const { is_complated } = req.body;

    //console.log('Received is_complated:', is_complated);

    try {
        const pool = await getPool();

        let query = `
            SELECT
                o.id,
                o.order_name,
                o.order_description,
                o.is_complated,
                o.start_date,
                o.end_date,
                o.IS_DELETED,
                e.Name AS employeer_name,
                d.Departman AS departman_name,
                d.id AS departman_id,
                e.id AS employeer_id
            FROM
                [Order] o
            JOIN
                Employeer_List e ON o.Employeer_id = e.id
            JOIN
                Departmants d ON o.Departman_id = d.id
            WHERE
                o.IS_DELETED = 0
        `;

        if (is_complated !== undefined) {
            query += ` AND o.is_complated = ${is_complated ? 1 : 0}`;
        }

        //console.log('Executing query:', query); // Kontrol etmek i�in

        const result = await pool.request().query(query);
        res.json({ data: result.recordset });
    } catch (err) {
        res.status(500).json({ message: 'Veritaban� hatas�: ' + err.message });
    }
};

const createorder = async (req, res) => {
    const { employeer_id, departman_id, order_name, order_description, is_complated, start_date, end_date } = req.body;

    // Sorgu tan�mlamas�
    const query = `INSERT INTO [Order] (employeer_id, departman_id, order_name, order_description, is_complated, start_date, end_date, IS_DELETED) 
    VALUES (@employeer_id, @departman_id, @order_name, @order_description, @is_complated, @start_date, @end_date, 0)`;

    try {
        const pool = await getPool();
        await pool.request()
            .input('employeer_id', sql.Int, employeer_id)
            .input('departman_id', sql.Int, departman_id) 
            .input('order_name', sql.NVarChar, order_name)
            .input('order_description', sql.NVarChar, order_description)
            .input('is_complated', sql.Bit, is_complated)
            .input('start_date', sql.Date, start_date)
            .input('end_date', sql.Date, end_date)
            .query(query);

        res.status(201).json({ message: 'Order ba�ar�yla olu�turuldu.' });
    } catch (err) {
        res.status(500).json({ message: 'Veritaban� hatas�: ' + err.message });
    }
}



const iscomplatedsetbyid = async (req, res) => {
    const { is_complated, id } = req.body;

    //let isComplatedValue;

    if (!is_complated == null) {
        res.json(404).json({message: 'Value cannot be NULL'})
    }

    if (!req.body) {
        res.json(404).json({
            message:'Request cannot be empty!'
        })
    }

    console.log(req.body);

    //if (is_complated === true) {
    //    isComplatedValue = 1; // true i�in 1
    //} else if (is_complated === false) {
    //    isComplatedValue = 0; // false i�in 0
    //} else {
    //    return res.status(400).json({ message: 'Ge�ersiz is_complated de�eri' });
    //}

    const query = `UPDATE [Order] SET is_complated = @is_complated WHERE id = @id`;

    try {
        const pool = await getPool();

        console.log('Executing query:', query);

        await pool.request()
            .input('id', sql.Int, id)
            .input('is_complated', sql.Bit, is_complated)
            .query(query);

        // G�ncelleme i�leminden sonra veriyi sorgula
        const updatedOrder = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM [Order] WHERE id = @id');

        console.log('Updated order:', updatedOrder.recordset);

        res.status(200).json({ message: 'G�ncelleme ba�ar�l�' });
    } catch (err) {
        res.status(500).json({ message: 'Veritaban� hatas�: ' + err.message });
    }
};






const getordersbyid = async (req, res) => {
    const { id } = req.query;
    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)  // Bu sat�rdaki noktal� virg�l kald�r�lmal�
            .query(`SELECT
                        o.id,
                        o.order_name,
                        o.order_description,
                        o.is_complated,
                        o.start_date,
                        o.end_date,
                        o.IS_DELETED,
                        e.Name AS employeer_name,
                        d.Departman AS departman_name,
                        d.id AS departman_id,
                        e.id AS employeer_id
                    FROM
                        [Order] o
                    JOIN
                        Employeer_List e ON o.Employeer_id = e.id
                    JOIN
                        Departmants d ON o.Departman_id = d.id
                    WHERE
                        o.IS_DELETED = 0 AND o.id = @id`);

        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Veritaban� hatas�: ' + err.message });
    }
};


module.exports = { getOrders, getordersbyid, iscomplatedsetbyid, createorder };
