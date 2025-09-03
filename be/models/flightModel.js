const pool = require("../db")

exports.getFlights = async (id) => {
    const sql = 'SELECT * FROM "Voli" WHERE ("IdVolo" = $1 OR $1 IS NULL) "IsActive" = true';
    const result = await pool.query(sql, [id]);
    return result.rows;
}

exports.newFlight = async (plane, route, schdepdate, scharrdate, actdepdate, actarrdate, state, pcprize, bprize, eprize, bagprize, lrprize, scprize) => {
    const sql = 'INSERT INTO "Voli" ("Aereo", "Rotta", "DataPartenzaPrev", "DateArrivoPrev", "DataPartenzaEff", "DataArrivoEff", "Stato", "CostoPC", "CostoB", "CostoE", "CostoBag", "CostoLegRoom", "CostoSceltaPosto") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)';
    const result = await pool.query(sql, [plane, route, schdepdate, scharrdate, actdepdate, actarrdate, state, pcprize, bprize, eprize, bagprize, lrprize, scprize]);
    return result.rowCount;
}

exports.deleteFlight = async (id) => {
    const sql = 'UPDATE "Voli" SET "IsActive" = false WHERE "IdVolo" = $1 AND "IsActive" = true';
    const result = await pool.query(sql, [id]);
    return result.rowCount;
}