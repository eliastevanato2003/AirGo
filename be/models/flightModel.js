const pool = require("../db")

exports.getFlights = async (id, airline, departure, arrival, mindatedeparture, maxdatedeparture, mindatearrival, maxdatearrival, order, plane, status) => {
    const sel = 'SELECT "Voli".*, "A1"."IdAeroporto" AS "IdPartenza","A1"."Nome" AS "NomePartenza", "A1"."Citta" AS "CittaPartenza", "A1"."CodiceIdentificativo" AS "CodicePartenza", "A2"."IdAeroporto" AS "IdArrivo", "A2"."Nome" AS "NomeArrivo", "A2"."Citta" AS "CittaArrivo", "A2"."CodiceIdentificativo" AS "CodiceArrivo", "C"."IdCompagniaAerea", "C"."Nome" AS "NomeCompagnia" FROM "Voli" ';
    const jo1 = 'JOIN "Rotte" AS "R" ON "Rotta" = "IdRotta" AND "R"."IsActive" = true '
    const jo2 = 'JOIN "Aeroporti" AS "A1" ON "A1"."IdAeroporto" = "Partenza" AND "A1"."IsActive" = true ';
    const jo3 = 'JOIN "Aeroporti" AS "A2" ON "A2"."IdAeroporto" = "Destinazione" AND "A2"."IsActive" = true ';
    const jo4 = 'JOIN "CompagnieAeree" AS "C" ON "C"."IdCompagniaAerea" = "R"."CompagniaAerea" AND "C"."IsActive" = true '; 
    const whe = 'WHERE ("IdVolo" = $1 OR $1 IS NULL) AND ("Partenza" = $2 OR $2 IS NULL) AND ("Destinazione" = $3 OR $3 IS NULL) AND ("DataPartenzaPrev" >= $4 OR $4 IS NULL) AND ("DataPartenzaPrev" <= $5 OR $5 IS NULL) AND ("DataArrivoPrev" >= $6 OR $6 IS NULL) AND ("DataArrivoPrev" <= $7 OR $7 IS NULL) AND ("IdCompagniaAerea" = $8 OR $8 IS NULL) AND ("Aereo" = $9 OR $9 IS NULL) AND ("Stato" = $10 OR $10 IS NULL) AND "Voli"."IsActive" = true ';
    const or1 = 'ORDER BY "CostoE" ASC;';
    const or2 = 'ORDER BY "CostoE" DESC;';
    const or3 = 'ORDER BY "DataPartenzaPrev" ASC;';
    const or4 = 'ORDER BY "DataPartenzaPrev" DESC;';
    const sql = sel + jo1 + jo2 + jo3 + jo4 + whe + (order == 1 ? or1 : order == 2 ? or2 : order == 3 ? or3 : order == 4 ? or4 : ';');
    const result = await pool.query(sql, [id, departure, arrival, mindatedeparture, maxdatedeparture, mindatearrival, maxdatearrival, airline, plane, status]);
    return result.rows;
}

exports.getFlightsJoin = async (airline, departure, arrival, mindatedeparture, maxdatedeparture, mindatearrival, maxdatearrival, order, plane, status) => {
    const se1 = 'SELECT to_json("V1".*) AS "V1", to_json("V2".*) AS "V2", "A1"."IdAeroporto" AS "IdPartenza1","A1"."Nome" AS "NomePartenza1", "A1"."Citta" AS "CittaPartenza1", "A1"."CodiceIdentificativo" AS "CodicePartenza1", "A2"."IdAeroporto" AS "IdArrivo1", "A2"."Nome" AS "NomeArrivo1", "A2"."Citta" AS "CittaArrivo1", "A2"."CodiceIdentificativo" AS "CodiceArrivo1", "C1"."IdCompagniaAerea" AS "IdCompagniaAerea1", "C1"."Nome" AS "NomeCompagnia1", ';
    const se2 = '"A3"."IdAeroporto" AS "IdPartenza2","A3"."Nome" AS "NomePartenza2", "A3"."Citta" AS "CittaPartenza2", "A3"."CodiceIdentificativo" AS "CodicePartenza2", "A4"."IdAeroporto" AS "IdArrivo2", "A4"."Nome" AS "NomeArrivo2", "A4"."Citta" AS "CittaArrivo2", "A4"."CodiceIdentificativo" AS "CodiceArrivo2", "C2"."IdCompagniaAerea" AS "IdCompagniaAerea2", "C2"."Nome" AS "NomeCompagnia2" FROM "Voli" AS "V1" ';
    const jo1 = 'JOIN "Rotte" AS "R1" ON "V1"."Rotta" = "R1"."IdRotta" AND "R1"."IsActive" = true '
    const jo2 = 'JOIN "Aeroporti" AS "A1" ON "A1"."IdAeroporto" = "R1"."Partenza" AND "A1"."IsActive" = true ';
    const jo3 = 'JOIN "Aeroporti" AS "A2" ON "A2"."IdAeroporto" = "R1"."Destinazione" AND "A2"."IsActive" = true ';
    const jo4 = 'JOIN "CompagnieAeree" AS "C1" ON "C1"."IdCompagniaAerea" = "R1"."CompagniaAerea" AND "C1"."IsActive" = true ';
    const jo5 = 'JOIN "Voli" AS "V2" ON ("V2"."DataArrivoPrev" - "V1"."DataPartenzaPrev" > \'2 hours\') AND ("V2"."DataArrivoPrev" - "V1"."DataPartenzaPrev" < \'24 hours\') AND "V2"."IsActive" = true ';
    const jo6 = 'JOIN "Rotte" AS "R2" ON "V2"."Rotta" = "R2"."IdRotta" AND "R2"."IsActive" = true ';
    const jo7 = 'JOIN "Aeroporti" AS "A3" ON "A3"."IdAeroporto" = "R2"."Partenza" AND "A3"."IsActive" = true '; 
    const jo8 = 'JOIN "Aeroporti" AS "A4" ON "A4"."IdAeroporto" = "R2"."Destinazione" AND "A4"."IsActive" = true ';
    const jo9 = 'JOIN "CompagnieAeree" AS "C2" ON "C2"."IdCompagniaAerea" = "R2"."CompagniaAerea" AND "C2"."IsActive" = true ';
    const whe = 'WHERE ("R1"."Partenza" = $1) AND ("R2"."Destinazione" = $2) AND ("R1"."Destinazione" = "R2"."Partenza") AND ("V1"."DataPartenzaPrev" >= $3 OR $3 IS NULL) AND ("V1"."DataPartenzaPrev" <= $4 OR $4 IS NULL) AND ("V2"."DataArrivoPrev" >= $5 OR $5 IS NULL) AND ("V2"."DataArrivoPrev" <= $6 OR $6 IS NULL) AND ("C1"."IdCompagniaAerea" = $7 OR $7 IS NULL) AND ("C2"."IdCompagniaAerea" = $7 OR $7 IS NULL) AND ("V1"."Aereo" = $8 OR $8 IS NULL) AND ("V2"."Aereo" = $8 OR $8 IS NULL) AND ("V2"."Stato" = $9 OR $9 IS NULL) AND ("V2"."Stato" = $9 OR $9 IS NULL) AND "V1"."IsActive" = true';
    const or1 = ' ORDER BY ("V1"."CostoE" + "V2"."CostoE") ASC;';
    const or2 = ' ORDER BY ("V1"."CostoE" + "V2"."CostoE") DESC;';
    const or3 = ' ORDER BY "V1"."DataPartenzaPrev" ASC;';
    const or4 = ' ORDER BY "V1"."DataPartenzaPrev" DESC;';
    const sql = se1 + se2 + jo1 + jo2 + jo3 + jo4 + jo5 + jo6 + jo7 + jo8 + jo9 + whe + (order == 1 ? or1 : order == 2 ? or2 : order == 3 ? or3 : order == 4 ? or4 : ';');
    const result = await pool.query(sql, [departure, arrival, mindatedeparture, maxdatedeparture, mindatearrival, maxdatearrival, airline, plane, status]);
    return result.rows;
}



exports.getFlightStatus = async (id) => {
    const sql = 'SELECT * FROM "aereiposti" WHERE "IdVolo" = $1 AND "IsActive" = true';
    const result = await pool.query(sql, [id]);
    return result.rows;
}

exports.newFlight = async (plane, route, schdepdate, scharrdate, pcprice, bprice, eprice, bagprice, lrprice, scprice) => {
    const sql = 'INSERT INTO "Voli" ("Aereo", "Rotta", "DataPartenzaPrev", "DataArrivoPrev", "Stato", "CostoPC", "CostoB", "CostoE", "CostoBag", "CostoLegRoom", "CostoSceltaPosto") VALUES ($1, $2, $3, $4, \'Programmato\', $5, $6, $7, $8, $9, $10)';
    const result = await pool.query(sql, [plane, route, schdepdate, scharrdate, pcprice, bprice, eprice, bagprice, lrprice, scprice]);
    return result.rowCount;
}

exports.updateFlight = async (id, effdepdate, effarrdate, status, pcprice, bprice, eprice) => {
    const sql = 'UPDATE "Voli" SET "DataPartenzaEff" = $1, "DataArrivoEff" = $2, "Stato" = $3, "CostoPC" = $4, "CostoB" = $5, "CostoE" = $6 WHERE "IdVolo" = $7 AND "IsActive" = true';
    const result = await pool.query(sql, [effdepdate, effarrdate, status, pcprice, bprice, eprice, id]);
    return result.rowCount;
}

exports.deleteFlight = async (id) => {
    const sql = 'UPDATE "Voli" SET "IsActive" = false WHERE "IdVolo" = $1 AND "IsActive" = true';
    const result = await pool.query(sql, [id]);
    return result.rowCount;
}