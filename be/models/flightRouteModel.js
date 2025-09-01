const pool = require("../db");

exports.getFlightRoutes = async (id, departure, arrival, airline) => {
    const sql = 'SELECT * FROM "Rotte" WHERE ("IdRotta" = $1 OR $1 IS NULL) AND ("Partenza" = $2 OR $2 IS NULL) AND ("Arrivo" = $3 OR $3 IS NULL) AND ("CompagniaAerea" = $4 OR $4 IS NULL) AND "IsActive" = true'
    const result = await pool.query(sql, [id, departure, arrival, airline]);
    return result.rows;
}

exports.newFlightRoute = async (departure, arrival, airline) => {
    const sql = 'INSERT INTO "Rotte" ("Partenza", "Destinazione", "CompagniaAerea") VALUES ($1, $2, $3);';
    const result = await pool.query(sql, [departure, arrival, airline]);
    return result.rowCount;
}

exports.updateFlightRoute = async (id, departure, arrival, airline) => {
    const sql = 'UPDATE "Rotte" SET "Partenza" = $1, "Arrivo" = $2, "CompagniaAerea" = $3 WHERE "IdRotta" = $4 AND "IsActive" = true;';
    const result = await pool.query(sql, [departure, arrival, airline, id]);
    return result.rowCount;
}

exports.deleteFlightRoute = async (id) => {
    const sql = 'UPDATE "Rotte" SET "IsActive" = false WHERE "IdRotta" = $1 AND "IsActive" = true';
    const result = await pool.query(sql, [id]);
    return result.rowCount;
}