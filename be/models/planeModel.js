const pool = require("../db");

exports.newPlane = async (airline, model, constructionyear) => {
    const sql = 'INSERT INTO "Aerei"("CompagniaAerea", "Modello", "AnnoCostruzione") VALUES ($1, $2, $3);';
    const result = await pool.query(sql, [airline, model, constructionyear]);
    return result.rowCount;
}