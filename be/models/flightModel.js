const pool = require("../db")

exports.getFlights = async (id, airline, departure, arrival, mindatedeparture, maxdatedeparture, mindatearrival, maxdatearrival, order, plane) => {
    const sel = 'SELECT "Voli".*, "A1"."IdAeroporto" AS "IdPartenza","A1"."Nome" AS "NomePartenza", "A1"."Citta" AS "CittaPartenza", "A1"."CodiceIdentificativo" AS "CodicePartenza", "A2"."IdAeroporto" AS "IdArrivo", "A2"."Nome" AS "NomeArrivo", "A2"."Citta" AS "CittaArrivo", "A2"."CodiceIdentificativo" AS "CodiceArrivo", "C"."IdCompagniaAerea", "C"."Nome" AS "NomeCompagnia" FROM "Voli" ';
    const jo1 = 'JOIN "Rotte" AS "R" ON "Rotta" = "IdRotta" AND "R"."IsActive" = true '
    const jo2 = 'JOIN "Aeroporti" AS "A1" ON "A1"."IdAeroporto" = "Partenza" AND "A1"."IsActive" = true ';
    const jo3 = 'JOIN "Aeroporti" AS "A2" ON "A2"."IdAeroporto" = "Destinazione" AND "A2"."IsActive" = true ';
    const jo4 = 'JOIN "CompagnieAeree" AS "C" ON "C"."IdCompagniaAerea" = "R"."CompagniaAerea" AND "C"."IsActive" = true '; 
    const whe = 'WHERE ("IdVolo" = $1 OR $1 IS NULL) AND ("Partenza" = $2 OR $2 IS NULL) AND ("Destinazione" = $3 OR $3 IS NULL) AND ("DataPartenzaPrev" >= $4 OR $4 IS NULL) AND ("DataPartenzaPrev" <= $5 OR $5 IS NULL) AND ("DataArrivoPrev" >= $6 OR $6 IS NULL) AND ("DataArrivoPrev" <= $7 OR $7 IS NULL) AND ("IdCompagniaAerea" = $8 OR $8 IS NULL) AND ("Aereo" = $9 OR $9 IS NULL) AND "Voli"."IsActive" = true ';
    const or1 = 'ORDER BY "CostoE" ASC;';
    const or2 = 'ORDER BY "CostoE" DESC;';
    const or3 = 'ORDER BY "DataPartenzaPrev" ASC;';
    const or4 = 'ORDER BY "DataPartenzaPrev" DESC;';
    const sql = sel + jo1 + jo2 + jo3 + jo4 + whe + (order == 1 ? or1 : order == 2 ? or2 : order == 3 ? or3 : order == 4 ? or4 : ';');
    const result = await pool.query(sql, [id, departure, arrival, mindatedeparture, maxdatedeparture, mindatearrival, maxdatearrival, airline, plane]);
    return result.rows;
}

exports.getFlightStatus = async (id) => {
    const sql = 'SELECT * FROM "aereiposti" WHERE "IdVolo" = $1 AND "IsActive" = ture';
    const result = await pool.query(sql, [id]);
    return result.rows;
}

exports.newFlight = async (plane, route, schdepdate, scharrdate, pcprize, bprize, eprize, bagprize, lrprize, scprize) => {
    const sql = 'INSERT INTO "Voli" ("Aereo", "Rotta", "DataPartenzaPrev", "DataArrivoPrev", "Stato", "CostoPC", "CostoB", "CostoE", "CostoBag", "CostoLegRoom", "CostoSceltaPosto") VALUES ($1, $2, $3, $4, \'Programmato\', $5, $6, $7, $8, $9, $10)';
    const result = await pool.query(sql, [plane, route, schdepdate, scharrdate, pcprize, bprize, eprize, bagprize, lrprize, scprize]);
    return result.rowCount;
}

exports.deleteFlight = async (id) => {
    const sql = 'UPDATE "Voli" SET "IsActive" = false WHERE "IdVolo" = $1 AND "IsActive" = true';
    const result = await pool.query(sql, [id]);
    return result.rowCount;
}