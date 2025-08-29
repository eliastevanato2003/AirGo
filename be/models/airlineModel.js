const pool = require("../db");

exports.getAirlines = async (id, name, identificationcode, email) => {
    const sql = 'SELECT * FROM "CompagnieAeree" WHERE ("IdCompagniaAerea" = $1 OR $1 IS NULL) AND ("Nome" = $2 OR $2 IS NULL) AND ("CodiceIdentificativo" = $3 OR $3 IS NULL) AND ("Email" = $4 OR $4 IS NULL) AND "IsActive" = true';
    const result = await pool.query(sql, [id, name, identificationcode, email]);
    return result.rows;
};

exports.newAirline = async (name, identificationcode, email, password) => {
    const sql = 'INSERT INTO "CompagnieAeree" ("Nome", "CodiceIdentificativo", "Email", "Password") VALUES ($1, $2, $3, $4)';
    const result = await pool.query(sql, [name, identificationcode, email, password]);
    return result.rowCount;
}