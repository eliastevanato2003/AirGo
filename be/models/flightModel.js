const pool = require("../db")

exports.getFlights = async (id, departure, arrival, ) => {
    const sel = 'SELECT "Voli".*, "A1"."IdAeroporto" AS "IdPartenza","A1"."Nome" AS "NomePartenza", "A1"."Citta" AS "CittaPartenza", "A1"."CodiceIdentificativo" AS "CodicePartenza", "A2"."IdAeroporto" AS "IdArrivo", "A2"."Nome" AS "NomeArrivo", "A2"."Citta" AS "CittaArrivo", "A2"."CodiceIdentificativo" AS "CodiceArrivo" FROM "Voli" ';
    const jo1 = 'JOIN "Rotte" AS "R" ON "Rotta" = "IdRotta" AND "R"."IsActive" = true '
    const jo2 = 'JOIN "Aeroporti" AS "A1" ON "A1"."IdAeroporto" = "Partenza" AND "A1"."IsActive" = true ';
    const jo3 = 'JOIN "Aeroporti" AS "A2" ON "A2"."IdAeroporto" = "Destinazione" AND "A2"."IsActive" = true ';
    const whe = 'WHERE ("IdVolo" = $1 OR $1 IS NULL) AND ("Partenza" = $2 OR $2 IS NULL) AND ("Destinazione" = $3 OR $3 IS NULL) AND "Voli"."IsActive" = true';
    const sql = sel + jo1 + jo2 + jo3 + whe;
    const result = await pool.query(sql, [id, departure, arrival]);
    return result.rows;
}

exports.newFlight = async (plane, route, schdepdate, scharrdate, actdepdate, actarrdate, state, pcprize, bprize, eprize, bagprize, lrprize, scprize) => {
    const sql = 'INSERT INTO "Voli" ("Aereo", "Rotta", "DataPartenzaPrev", "DateArrivoPrev", "DataPartenzaEff", "DataArrivoEff", "Stato", "CostoPC", "CostoB", "CostoE", "CostoBag", "CostoLegRoom", "CostoSceltaPosto") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)';
    const result = await pool.query(sql, [plane, route, schdepdate, scharrdate, actdepdate, actarrdate, state, pcprize, bprize, eprize, bagprize, lrprize, scprize]);
    return result.rowCount;
}

exports.deleteFlight = async (id) => {
    const sql = 'UPDATE "Voli" SET "IsActive" = false WHERE "IdVolo" = $1 AND "IsActive" = true';
    const result = await pool.query(sql, [id]);
    return result.rowCount;
}