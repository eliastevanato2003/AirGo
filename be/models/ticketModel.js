const pool = require("../db")

exports.getTickets = async (id, user, flight, row, col, clas) => {
    const sql = 'SELECT * FROM "Biglietti" WHERE ("IdBiglietto" = $1 OR $1 IS NULL) AND ("Utente" = $2 OR $2 IS NULL) AND ("Volo" = $3 OR $3 IS NULL) AND ("RigPosto" = $4 OR $4 IS NULL) AND ("ColPosto" = $5 OR $5 IS NULL) AND ("Classe" = $6 OR $6 IS NULL) AND "IsActive" = true';
    const result = await pool.query(sql, [id, user, flight, row, col, clas]);
    return result.rows;
}

exports.newTicket = async (user, flight, name, surname, dob, clas, nextrabag, row, col, nseat, chseat, price) => {
    const sql = 'INSERT INTO "Biglietti" ("Utente", "Volo", "Nome", "Cognome", "DoB", "Classe", "NBagagliExtra", "ColPosto", "RigPosto", "NPosto", "SceltaPosto", "Costo") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);';
    const result = await pool.query(sql, [user, flight, name, surname, dob, clas, nextrabag, col, row, nseat, chseat, price]);
    return result.rowCount;
}

exports.deleteTicket = async (id) => {
    const sql = 'UPDATE "Biglietti" SET "IsActive" = false WHERE "IdVolo" = $1 AND "IsActive" = true';
    const result = await pool.query(sql, [id]);
    return result.rowCount;
}