const pool = require("../db")

exports.getTickets = async (airline, id, user, flight, row, col, clas) => {
    const sel = 'SELECT * FROM "Biglietti" AS "B" ';
    const jo1 = 'JOIN "Voli" AS "V" ON "Volo" = "IdVolo" AND "V"."IsActive" = true ';
    const jo2 = 'JOIN "Rotte" AS "R" ON "Rotta" = "IdRotta" AND ("CompagniaAerea" = $1 OR $1 IS NULL) AND "R"."IsActive" = true ';
    const whe = 'WHERE ("IdBiglietto" = $2 OR $2 IS NULL) AND ("Utente" = $3 OR $3 IS NULL) AND ("Volo" = $4 OR $4 IS NULL) AND ("RigPosto" = $5 OR $5 IS NULL) AND ("ColPosto" = $6 OR $6 IS NULL) AND ("Classe" = $7 OR $7 IS NULL) AND "B"."IsActive" = true';
    const sql = sel + jo1 + jo2 + whe;
    const result = await pool.query(sql, [airline, id, user, flight, row, col, clas]);
    return result.rows;
}

exports.newTicket = async (user, flight, name, surname, dob, clas, nextrabag, row, col, nseat, chseat, price) => {
    const sql = 'INSERT INTO "Biglietti" ("Utente", "Volo", "Nome", "Cognome", "DoB", "Classe", "NBagagliExtra", "ColPosto", "RigPosto", "NPosto", "SceltaPosto", "Costo") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);';
    const result = await pool.query(sql, [user, flight, name, surname, dob, clas, nextrabag, col, row, nseat, chseat, price]);
    return result.rowCount;
}

exports.updateTicket = async (id, name, surname, dob, nextrabag, row, col, nseat, price ) => {
    const sql = 'UPDATE "Biglietti" SET "Nome" = $1, "Cognome" = $2, "DoB" = $3, "NBagagliExtra" = $4, "RigPosto" = $5, "ColPosto" = $6, "NPosto" = $7, "Costo" = $8 WHERE "IsActive" = true AND "IdBiglietto" = $9';
    const result = await pool.query(sql, [name, surname, dob, nextrabag, row, col, nseat, price, id]);
    return result.rowCount; 
}

exports.deleteTicket = async (id) => {
    const sql = 'UPDATE "Biglietti" SET "IsActive" = false WHERE "IdBiglietto" = $1 AND "IsActive" = true';
    const result = await pool.query(sql, [id]);
    return result.rowCount;
}