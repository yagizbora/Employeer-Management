const { getPool } = require("../database");
const sql = require("mssql");
const verifyToken = require("../Middleware/verifyToken");

const listallhistory = async (req, res) => {
  const tokenCheck = await verifyToken(req);
  if (!tokenCheck.status) {
    return res.status(401).json({ message: tokenCheck.message });
  }
  const query = `
SELECT co.*,c.customer_name,e.Name FROM Communication_History co 
INNER JOIN Customer c ON c.id = co.customer_id
INNER JOIN Employeer_List e ON e.id = co.employeer_id WHERE co.is_deleted = 0`;

  try {
    const pool = await getPool();
    const result = await pool.request().query(query);
    return res.status(200).json({ data: result.recordset });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "false", error: "Database error" + error.message });
  }
};

const createhistory = async (req, res) => {
  const tokenCheck = await verifyToken(req);
  if (!tokenCheck.status) {
    return res.status(401).json({ message: tokenCheck.message });
  }
  const {
    customer_id,
    employeer_id,
    communaction_type,
    details,
    timestamp,
    rating,
  } = req.body;

  if (
    !customer_id ||
    !employeer_id ||
    !communaction_type ||
    !details ||
    !timestamp ||
    !rating
  ) {
    return res.status(400).json({ message: "All fields is required!" });
  }
  const query = `INSERT INTO Communication_History (customer_id,employeer_id,communaction_type,details,timestamp,rating,is_deleted)
    VALUES (@customer_id,@employeer_id,@communaction_type,@details,@timestamp,@rating,0)`;

  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("customer_id", sql.Int, customer_id)
      .input("employeer_id", sql.Int, employeer_id)
      .input("communaction_type", sql.VarChar, communaction_type)
      .input("details", sql.VarChar, details)
      .input("timestamp", sql.DateTime, timestamp)
      .input("rating", sql.Int, rating)
      .query(query);
    res.status(201).json({ message: "History created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Database error ", error: error.message });
  }
};

const listallhistorybyid = async (req, res) => {
  const tokenCheck = await verifyToken(req);
  if (!tokenCheck.status) {
    return res.status(401).json({ message: tokenCheck.message });
  }

  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }
  const query = `
   SELECT co.id,co.customer_id,co.employeer_id,co.communaction_type,co.details,co.timestamp,co.rating,c.customer_name,e.Name FROM Communication_History co 
   INNER JOIN Customer c ON c.id = co.customer_id
   INNER JOIN Employeer_List e ON e.id = co.employeer_id WHERE co.is_deleted = 0 AND co.id = @id`;

  try {
    const pool = await getPool();
    const result = await pool.request().input("id", sql.Int, id).query(query);
    if (result.recordset.length > 0) {
      return res.status(200).json({ data: result.recordset[0] });
    } else if (result.recordset.length === 0) {
      return res.status(404).json({ message: "History is not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: "false", error: "Database error" + error.message });
  }
};

const deletehistorybyid = async (req, res) => {
  const tokenCheck = await verifyToken(req);
  if (!tokenCheck.status) {
    return res.status(401).json({ message: tokenCheck.message });
  }
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }
  const query = `UPDATE Communication_History SET is_deleted = 1 WHERE id = @id`;
  try {
    const pool = await getPool();
    const result = await pool.request().input("id", sql.Int, id).query(query);
    if (result.rowsAffected[0] > 0) {
      return res
        .status(200)
        .json({ message: "History is deleted", status: "true" });
    } else {
      res.status(404).json({ message: "History is not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: "false", error: "Database error" + error.message });
  }
};

const updatehistorybyid = async (req, res) => {
  const tokenCheck = await verifyToken(req);
  if (!tokenCheck.status) {
    return res.status(401).json({ message: tokenCheck.message });
  }

  const {
    id,
    customer_id,
    employeer_id,
    communaction_type,
    details,
    timestamp,
  } = req.body;

  if (
    !id ||
    !customer_id ||
    !employeer_id ||
    !communaction_type ||
    !details ||
    !timestamp
  ) {
    return res.status(400).json({ message: "All field is required!" });
  }

  const query = `UPDATE Communication_History SET customer_id = @customer_id,employeer_id = @employeer_id,communaction_type = @communaction_type, details = @details, timestamp = @timestamp
  WHERE id = @id
  `;
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("customer_id", sql.Int, customer_id)
      .input("employeer_id", sql.Int, employeer_id)
      .input("communaction_type", sql.VarChar, communaction_type)
      .input("details", sql.VarChar, details)
      .input("timestamp", sql.DateTime, timestamp)
      .query(query);
    if (result.rowsAffected[0] > 0) {
      return res
        .status(200)
        .json({ message: "History is edited", status: "true" });
    } else {
      res.status(404).json({ message: "History is not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Database error ", error: error.message });
  }
};

module.exports = {
  listallhistory,
  listallhistorybyid,
  deletehistorybyid,
  createhistory,
  updatehistorybyid,
};
