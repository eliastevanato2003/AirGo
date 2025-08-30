const pool = require("../db");

exports.getUsers = async (id, name, surname, email) => {
    const sql = 'SELECT * FROM "Utenti" JOIN "IndirizziEmail" ON "Utenti"."Mail" = "IndirizziEmail"."IdEmail" WHERE ("IdUtente" = $1 OR $1 IS NULL) AND("Nome" = $2 OR $2 IS NULL) AND ("Cognome" = $3 OR $3 IS NULL) AND ("Email" = $4 OR $4 IS NULL) AND "Utenti"."IsActive" = true';
    const result = await pool.query(sql, [id, name, surname, email]);
    return result.rows;
};

exports.newUser = async (name, surname, email, password, number, dob) => {
    const sql1 = 'INSERT INTO "IndirizziEmail" ("Email") VALUES ($1) RETURNING *';
    const result1 = await pool.query(sql1, [email]);
    if (result1.rowCount == 1) {
        try {
            const idemail = result1.rows[0].IdEmail;
            const sql2 = 'INSERT INTO "Utenti" ("Nome", "Cognome", "Mail", "Password", "Telefono", "DoB") VALUES ($1, $2, $3, $4, $5, $6)';
            const result2 = await pool.query(sql2, [name, surname, idemail, password, number, dob]);
            return result2.rowCount;
        } catch (err) {
            const sql3 = 'DELETE FROM "IndirizziEmail" WHERE "Email" = $1';
            await pool.query(sql3, [email]);
            throw err;
        }
    } else throw Error("Error during email insertion");
}

