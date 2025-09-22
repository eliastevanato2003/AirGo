const pool = require("../db");

exports.getAirlines = async (id, name, identificationcode, email) => {
    const sel = 'SELECT * FROM "CompagnieAeree" JOIN "IndirizziEmail" ON "CompagnieAeree"."Mail" = "IndirizziEmail"."IdEmail" AND "IndirizziEmail"."IsActive" = true ';
    const whe = 'WHERE ("IdCompagniaAerea" = $1 OR $1 IS NULL) AND ("Nome" = $2 OR $2 IS NULL) AND ("CodiceIdentificativo" = $3 OR $3 IS NULL) AND ("Email" = $4 OR $4 IS NULL) AND "CompagnieAeree"."IsActive" = true';
    const sql = sel + whe;
    const result = await pool.query(sql, [id, name, identificationcode, email]);
    return result.rows;
};

exports.getAirlineForActivation = async (email) => {
    const sel = 'SELECT * FROM "CompagnieAeree" JOIN "IndirizziEmail" ON "CompagnieAeree"."Mail" = "IndirizziEmail"."IdEmail" AND "IndirizziEmail"."IsActive" = true ';
    const whe = 'WHERE ("Email" = $1 OR $1 IS NULL) AND "CompagnieAeree"."IsActive" = false';
    const sql = sel + whe;
    const result = await pool.query(sql, [email]);
    return result.rows;
};

exports.newAirline = async (name, identificationcode, email, password) => {
    const sql = 'INSERT INTO "CompagnieAeree" ("Nome", "CodiceIdentificativo", "Mail", "Password") VALUES ($1, $2, $3, $4)';
    const result = await pool.query(sql, [name, identificationcode, email, password]);
    return result.rowCount;
}

exports.activateAirline = async (id) => {
    const sql = 'UPDATE "CompagnieAeree" SET "IsActive" = true WHERE "IdCompagniaAerea" = $1 AND "IsActive" = false';
    const result = await pool.query(sql, [id]);
    return result.rowCount;
}

exports.updateAirline = async (id, name, identificationcode) => {
    const sql = 'UPDATE "CompagnieAeree" SET "Nome" = $1, "CodiceIdentificativo" = $2 WHERE "IdCompagniaAerea" = $3 AND "IsActive" = true';
    const result = await pool.query(sql, [name, identificationcode, id]);
    return result.rowCount;
}

exports.updatePassword = async (id, password) => {
    const sql = 'UPDATE "CompagnieAeree" SET "Password" = $1 WHERE "IdCompagniaAerea" = $2 AND "IsActive" = true';
    const result = await pool.query(sql, [password, id]);
    return result.rowCount;
}

exports.deleteAirline = async (id) => {
    const sql = 'UPDATE "CompagnieAeree" SET "IsActive" = false WHERE "IdCompagniaAerea" = $1 AND "IsActive" = true';
    const result = await pool.query(sql, [id]);
    return result.rowCount;
}

exports.getStatsRoute = async (id, order) => {
    let sql = 'SELECT * FROM "statistiche" WHERE "CompagniaAerea" = $1 ';
    const order1 = 'ORDER BY ("BigliettiPrimaClasse" + "BigliettiEconomy" + "BigliettiBusiness") / ("PostiEconomyTotali" + "PostiBusinessTotali" + "PostiPrimaClasseTotali") DESC';
    const order2 = 'ORDER BY ("BigliettiPrimaClasse" + "BigliettiEconomy" + "BigliettiBusiness") DESC';
    sql += order == 1 ? order1 : order2;
    const result = await pool.query(sql, [id]);
    return result.rows;
}

exports.getStatsFlight = async (id, route, order) => {
    let sql = 'SELECT * FROM "aereiposti" AS "A" JOIN "Rotte" AS "R" ON "A"."Rotta" = "R"."IdRotta" AND ("A"."Rotta" = $2 OR $2 IS NULL) WHERE "CompagniaAerea" = $1 ';
    const result = await pool.query(sql, [id, route]);
    return result.rows;
}