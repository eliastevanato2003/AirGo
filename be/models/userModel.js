const pool = require("../db");

exports.getUsers = async (id, name, surname, email) => {
    const sql = 'SELECT * FROM "Utenti" WHERE ("IdUtente" = $1 OR $1 IS NULL) AND("Nome" = $2 OR $2 IS NULL) AND ("Cognome" = $3 OR $3 IS NULL) AND ("Email" = $4 OR $4 IS NULL) AND "IsActive" = true';
    const result = await pool.query(sql, [id, name, surname, email]);
    return result.rows;
};

exports.newUser = async (name, surname, email, password, number, dob) => {
    const sql = 'INSERT INTO "Utenti" ("Nome", "Cognome", "Email", "Password", "Telefono", "DoB") VALUES ($1, $2, $3, $4, $5, $6)';
    const result = await pool.query(sql, [name, surname, email, password, number, dob]);
    return result.rowCount;
}

