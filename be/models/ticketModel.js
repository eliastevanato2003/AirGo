const pool = require("../db")

exports.getTickets = async (id, user, flight) => {
    const sql = 'SELECT * FROM "Biglietti" WHERE ("IdBiglietto" = $1 OR $1 IS NULL) AND ("Utente" = $2 OR $2 IS NULL) AND ("Volo" = $3 OR $3 IS NULL) AND "IsActive" = true';
    const result = await pool.query(sql, [id, user, flight]);
    return result.rows;
}

exports.newTicket = async (user, flight, name, surname, dob, clas, nextrabag, row, col, nseat) => {
    const sql = 'INSERT INTO "Biglietti" ("Utente", "Volo", "Nome", "Cognome", "DoB", "Classe", "NBagagliExtra", "ColPosto", "RigPosto", "NPosto") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);';
    const result = await pool.query(sql, [user, flight, name, surname, dob, clas, nextrabag, row, col, nseat]);
    return result.rowCount;
}

exports.deleteTicket = async (id) => {
    const sql = 'UPDATE "Biglietti" SET "IsActive" = false WHERE "IdVolo" = $1 AND "IsActive" = true';
    const result = await pool.query(sql, [id]);
    return result.rowCount;
}