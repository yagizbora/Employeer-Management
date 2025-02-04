const { getPool } = require("../database");
const sql = require("mssql");
const verifyToken = require("../Middleware/verifyToken");

const getOrders = async (req, res) => {
  const tokenCheck = await verifyToken(req); // Token kontrolünü asenkron olarak yap
  if (!tokenCheck.status) {
    return res.status(401).json({ message: tokenCheck.message });
  }
  const { is_complated } = req.body;

  //console.log('Received is_complated:', is_complated);

  try {
    const pool = await getPool();

    let query = `
        SELECT
        o.*,
        e.Name AS employeer_name,
        d.Departman AS departman_name
        FROM
        [Order] O
        JOIN
        Employeer_List e ON o.employeer_id = e.id
        JOIN
        Departmants d ON o.departman_id = d.id
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
    console.error("Database Error:", err);
    res.status(500).json({ message: "Database Error" });
  }
};

const createorder = async (req, res) => {
  const tokenCheck = await verifyToken(req); // Token kontrolünü asenkron olarak yap
  if (!tokenCheck.status) {
    return res.status(401).json({ message: tokenCheck.message });
  }
  const {
    employeer_id,
    departman_id,
    order_name,
    order_description,
    is_complated,
    start_date,
    end_date,
  } = req.body;

  if (
    !employeer_id ||
    !departman_id ||
    !order_name ||
    !order_description ||
    !start_date ||
    !end_date ||
    typeof is_complated !== "boolean"
  ) {
    return res.status(500).json({ message: "All fields must be required" });
  }

  const query = `INSERT INTO [Order] (employeer_id, departman_id, order_name, order_description, is_complated, start_date, end_date, IS_DELETED) 
    VALUES (@employeer_id, @departman_id, @order_name, @order_description, @is_complated, @start_date, @end_date, 0)`;

  try {
    const pool = await getPool();
    await pool
      .request()
      .input("employeer_id", sql.Int, employeer_id)
      .input("departman_id", sql.Int, departman_id)
      .input("order_name", sql.NVarChar, order_name)
      .input("order_description", sql.NVarChar, order_description)
      .input("is_complated", sql.Bit, is_complated)
      .input("start_date", sql.Date, start_date)
      .input("end_date", sql.Date, end_date)
      .query(query);
    res.status(201).json({ message: "Order başarıyla oluşturuldu." });
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ message: "Database Error" });
  }
};

const iscomplatedsetbyid = async (req, res) => {
  const tokenCheck = await verifyToken(req); // Token kontrolünü asenkron olarak yap
  if (!tokenCheck.status) {
    return res.status(401).json({ message: tokenCheck.message });
  }
  const { is_complated, id } = req.body;

  //let isComplatedValue;

  if (!is_complated == null) {
    res.json(404).json({ message: "Value cannot be NULL" });
  }

  if (!req.body) {
    res.json(404).json({
      message: "Request cannot be empty!",
    });
  }

  const query = `UPDATE [Order] SET is_complated = @is_complated , complated_date = @datenow WHERE id = @id`;

  try {
    const pool = await getPool();

    //console.log('Executing query:', query);

const now = new Date();

const datenow = now.toISOString().split('T')[0]

    await pool
      .request()
      .input("id", sql.Int, id)
      .input("is_complated", sql.Bit, is_complated)
      .input("datenow",sql.Date,datenow)
      .query(query);

    // G�ncelleme i�leminden sonra veriyi sorgula
    const updatedOrder = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM [Order] WHERE id = @id");

    //console.log('Updated order:', updatedOrder.recordset);

    res.status(200).json({ message: "G�ncelleme ba�ar�l�" });
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ message: "Database Error" });
  }
};

const deleteorders = async (req, res) => {
  const tokenCheck = await verifyToken(req);
  if (!tokenCheck.status) {
    return res.status(401).json({ message: tokenCheck.message });
  }
  const { id } = req.body;

  if (!id) {
    res.status(400).json({ message: "Id is required" });
    return;
  }
  const query = `UPDATE [Order] SET IS_DELETED = 1 WHERE id = @id`;
  try {
    const pool = await getPool();

    const result = await pool.request().input("id", sql.Int, id).query(query);
    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ message: "Employeer is deleted" });
    } else {
      res.status(404).json({ message: "Employeer is not found" });
    }
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ message: "Database Error" });
  }
};

const updateorderbyid = async (req, res) => {
  const tokenCheck = await verifyToken(req); // Token kontrolünü asenkron olarak yap
  if (!tokenCheck.status) {
    return res.status(401).json({ message: tokenCheck.message });
  }
  const {
    id,
    employeer_id,
    departman_id,
    order_name,
    order_description,
    start_date,
    end_date,
  } = req.body;

  if (
    !employeer_id ||
    !departman_id ||
    !order_name ||
    !order_description ||
    !start_date ||
    !end_date
  ) {
    return res.status(500).json({ message: "All fields must be required" });
  }
  if (!id) {
    res.status(404).json({ message: "Id is required" });
    return;
  }
  const query = `UPDATE [ORDER] SET employeer_id = @employeer_id, departman_id = @departman_id,order_name = @order_name,order_description = @order_description,start_date = @start_date
    ,end_date = @end_date WHERE id = @id`;
  try {
    const pool = await getPool();
    //console.log('Executing query:', query);
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("employeer_id", sql.Int, employeer_id)
      .input("departman_id", sql.Int, departman_id)
      .input("order_name", sql.NVarChar, order_name)
      .input("order_description", sql.NVarChar, order_description)
      .input("start_date", sql.Date, start_date)
      .input("end_date", sql.Date, end_date)
      .query(query);

    res.status(201).json({ message: "Order is changed" });
  } catch (err) {
    //console.error('Database Error:', err);
    res.status(500).json({ message: "Database Error" });
  }
};

const getordersbyid = async (req, res) => {
  const tokenCheck = await verifyToken(req); // Token kontrolünü asenkron olarak yap
  if (!tokenCheck.status) {
    return res.status(401).json({ message: tokenCheck.message });
  }
  //const { id } = req.query;
  const id = req.query.id;

  if (!id) {
    res.status(400).json({ message: "Id is required" });
    return;
  }
  try {
    const pool = await getPool();
    const result = await pool.request().input("id", sql.Int, id).query(`SELECT
                    o.id,
                    o.order_name,
                    o.order_description,
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
    console.error("Database Error:", err);
    res.status(500).json({ message: "Database Error" });
  }
};

module.exports = {
  getOrders,
  getordersbyid,
  iscomplatedsetbyid,
  updateorderbyid,
  createorder,
  deleteorders,
};
