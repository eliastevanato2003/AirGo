const pool = require("../db");

exports.getUsers = async (id, name, surname, email) => {
    const sel = 'SELECT * FROM "Utenti" JOIN "IndirizziEmail" ON "Utenti"."Mail" = "IndirizziEmail"."IdEmail" ';
    const whe = 'WHERE ("IdUtente" = $1 OR $1 IS NULL) AND("Nome" = $2 OR $2 IS NULL) AND ("Cognome" = $3 OR $3 IS NULL) AND ("Email" = $4 OR $4 IS NULL) AND "Utenti"."IsActive" = true';
    const sql = sel + whe;
    const result = await pool.query(sql, [id, name, surname, email]);
    return result.rows;
};

exports.newUser = async (name, surname, email, password, number, dob) => {
    const sql = 'INSERT INTO "Utenti" ("Nome", "Cognome", "Mail", "Password", "Telefono", "DoB") VALUES ($1, $2, $3, $4, $5, $6)';
    const result2 = await pool.query(sql, [name, surname, email, password, number, dob]);
    return result2.rowCount;
}

exports.updateUser = async (id, name, surname, number, dob) => {
    const sql1 = 'UPDATE "Utenti" SET "Nome" = $1, "Cognome" = $2, "Telefono" = $3, "DoB" = $4 WHERE "IdUtente" = $5 AND "IsActive" = true';
    const result2 = await pool.query(sql2, [name, surname, number, dob, id]);
    return result2.rowCount;
}

exports.updatePassword = async (id, password) => {
    const sql = 'UPDATE "Utenti" SET "Password" = $1 WHERE "IdUtente" = $2 AND "IsActive" = true';
    const result = await pool.query(sql, [password, id]);
    return result.rowCount;
}

exports.deleteUser = async (id) => {
    const sql = 'UPDATE "Utenti" SET "IsActive" = false WHERE "IdUtente" = $1 AND "IsActive" = true';
    const result = await pool.query(sql, [id]);
    return result.rowCount;
}


