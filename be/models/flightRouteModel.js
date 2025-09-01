const pool = require("../db");

exports.getFlightRoutes = async (id, departure, arrival, airline) => {
    
}

exports.newFlightRoute = async (departure, arrival, airline) => {
    const sql = 'INSERT INTO "Rotte" ("Partenza", "Destinazione", "CompagniaAerea") VALUES ($1, $2, $3);';
    const result = await pool.query(sql, [departure, arrival, airline]);
    return result.rowCount;
}