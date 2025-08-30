const pool = require("../db");

exports.newModel = async (name, seatspc, rowsb, columnsb, rowse, columnse) => {
    const sql = "";
    const result = await pool.query(sql, []);
    return result.rowCount;
}