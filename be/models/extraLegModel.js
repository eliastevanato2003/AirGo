const pool = require("../db");

exports.getExtraLegs = async (id, model, row) => {
    const sql = 'SELECT * FROM "RigheExtraLegRoom" WHERE ("IdRiga" = $1 OR $1 IS NULL) AND ("Modello" = $2 OR $2 IS NULL) AND ("NRiga" = $3 OR $3 IS NULL) AND "IsActive" = true';
    const result = await pool.query(sql, [id, model, row]);
    return result.rows;
}

exports.newExtraLeg = async (model, row) => {
    const sql = 'INSERT INTO "RigheExtraLegRoom" ("Modello", "NRiga") VALUES ($1, $2)';
    const result = await pool.query(sql, [model, row]);
    return result.rowCount;
}

exports.deleteExtraLeg = async (id) => {
    const sql = 'UPDATE "RigheExtraLegRoom" SET "IsActive" = false WHERE "IdRiga" = $1 AND "IsActive" = true';
    const result = await pool.query(sql, [id]);
    return result.rowCount;
}