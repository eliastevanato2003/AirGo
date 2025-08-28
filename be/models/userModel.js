const pool = require("../db");

exports.getUsers = async () => {
    const sql = 'SELECT * FROM "Utenti" WHERE "IsActive" = true';
    const result = await pool.query(sql);
    return result.rows; 
};

exports.newUser = async (name, surname, email, password, number, dob) => {
    const sql = 'INSERT INTO "Utenti" ("Nome", "Cognome", "Email", "Password", "Telefono", "DoB") VALUES ($1, $2, $3, $4, $5, $6)';
    const result = await pool.query(sql, [name, surname, email, password, number, dob]);
    return 1;
}

