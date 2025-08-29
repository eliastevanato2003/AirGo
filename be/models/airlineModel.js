const pool = require("../db");

exports.getAirlines = async () => {
    const sql = 'SELECT * FROM "CompagnieAeree" WHERE "IsActive" = true';
    const result = await pool.query(sql);
    return result.rows;
};

exports.newAirline = async (name, identificationcode, email, password) => {
    const sql = 'INSERT INTO "CompagnieAeree" ("Nome", "CodiceIdentificativo", "Email", "Password") VALUES ($1, $2, $3, $4)';
    const result = await pool.query(sql, [name, identificationcode, email, password]);
    return result.rowCount;
}