const pool = require("../db");

exports.getAirlines = async (id, name, identificationcode, email) => {
    const sql = 'SELECT * FROM "CompagnieAeree" JOIN "IndirizziEmail" ON "CompagnieAeree"."Mail" = "IndirizziEmail"."IdEmail" WHERE ("IdCompagniaAerea" = $1 OR $1 IS NULL) AND ("Nome" = $2 OR $2 IS NULL) AND ("CodiceIdentificativo" = $3 OR $3 IS NULL) AND ("Email" = $4 OR $4 IS NULL) AND "CompagnieAeree"."IsActive" = true';
    const result = await pool.query(sql, [id, name, identificationcode, email]);
    return result.rows;
};

exports.newAirline = async (name, identificationcode, email, password) => {
    const sql1 = 'INSERT INTO "IndirizziEmail" ("Email") VALUES ($1) RETURNING *';
    const result1 = await pool.query(sql1, [email]);
    if (result1.rowCount == 1) {
        try {
            const idemail = result1.rows[0].IdEmail;
            const sql2 = 'INSERT INTO "CompagnieAeree" ("Nome", "CodiceIdentificativo", "Mail", "Password") VALUES ($1, $2, $3, $4)';
            const result2 = await pool.query(sql2, [name, identificationcode, idemail, password]);
            return result2.rowCount;
        } catch (err) {
            const sql3 = 'DELETE FROM "IndirizziEmail" WHERE "Email" = $1';
            await pool.query(sql3, [email]);
            throw err;
        }
    } else throw Error("Error during email insertion");
}