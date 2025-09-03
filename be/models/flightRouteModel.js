const pool = require("../db");

exports.getFlightRoutes = async (id, departure, arrival, airline) => {
    const sel = 'SELECT "IdRotta", ';
    const as1 = '"Partenza" AS "IdPartenza", "A1"."Nome" AS "NomePartenza", "A1"."Citta" AS "CittaPartenza", "A1"."Nazione" AS "NazionePartenza", "A1"."CodiceIdentificativo" AS "CodicePartenza", ';
    const as2 = '"Destinazione" AS "IdDestinazione", "A2"."Nome" AS "NomeDestinazione", "A2"."Citta" AS "CittaDestinazione", "A2"."Nazione" AS "NazioneDestinazione", "A2"."CodiceIdentificativo" AS "CodiceDestinazione", ';
    const as3 = '"CompagniaAerea" AS "IdCompagniaAerea", "C"."Nome" AS "NomeCompagnia", "C"."CodiceIdentificativo" AS "CodiceCompagnia" ';
    const joi = 'FROM "Rotte" JOIN "Aeroporti" AS "A1" ON "A1"."IdAeroporto" = "Partenza AND "A1"."IsActive" = true JOIN "Aeroporti" AS "A2" ON "A2"."IdAeroporto" = "Destinazione" AND "A2"."IsActive" = true JOIN "CompagnieAeree" AS "C" ON "C"."IdCompagniaAerea" = "CompagniaAerea" AND "C"."IsActive" = true ';
    const whe = 'WHERE ("IdRotta" = $1 OR $1 IS NULL) AND ("Partenza" = $2 OR $2 IS NULL) AND ("Destinazione" = $3 OR $3 IS NULL) AND ("CompagniaAerea" = $4 OR $4 IS NULL) AND "Rotte"."IsActive" = true';
    const sql = sel + as1 + as2 + as3 + joi + whe;
    const result = await pool.query(sql, [id, departure, arrival, airline]);
    return result.rows;
}

exports.newFlightRoute = async (departure, arrival, airline) => {
    const sql = 'INSERT INTO "Rotte" ("Partenza", "Destinazione", "CompagniaAerea") VALUES ($1, $2, $3);';
    const result = await pool.query(sql, [departure, arrival, airline]);
    return result.rowCount;
}

exports.updateFlightRoute = async (id, departure, arrival, airline) => {
    const sql = 'UPDATE "Rotte" SET "Partenza" = $1, "Destinazione" = $2, "CompagniaAerea" = $3 WHERE "IdRotta" = $4 AND "IsActive" = true;';
    const result = await pool.query(sql, [departure, arrival, airline, id]);
    return result.rowCount;
}

exports.deleteFlightRoute = async (id) => {
    const sql = 'UPDATE "Rotte" SET "IsActive" = false WHERE "IdRotta" = $1 AND "IsActive" = true';
    const result = await pool.query(sql, [id]);
    return result.rowCount;
}