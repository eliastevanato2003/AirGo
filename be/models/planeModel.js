const pool = require("../db");

exports.getPlanes = async (id, airline, model, constructionyear, inservice) => {
    const as1 = 'SELECT "IdAereo", "AnnoCostruzione", "IdCompagniaAerea", "InServizio", "C"."Nome" AS "NomeCompagnia", "C"."CodiceIdentificativo", "IdModello", "M"."Nome" AS "NomeModello" ';
    const joi = 'FROM "Aerei" JOIN "CompagnieAeree" AS "C" ON "CompagniaAerea" = "C"."IdCompagniaAerea" AND "C"."IsActive" = true JOIN "Modelli" AS "M" ON "Modello" = "M"."IdModello" AND "M"."IsActive" = true ';
    const whe = 'WHERE ("IdAereo" = $1 OR $1 IS NULL) AND ("CompagniaAerea" = $2 OR $2 IS NULL) AND ("Modello" = $3 OR $3 IS NULL) AND ("AnnoCostruzione" = $4 OR $4 IS NULL) AND ("InServizio" = $5 OR $5 IS NULL) AND "Aerei"."IsActive" = true';
    const sql = as1 + joi + whe;
    const result = await pool.query(sql, [id, airline, model, constructionyear, inservice]);
    return result.rows;
}

exports.newPlane = async (airline, model, constructionyear) => {
    const sql = 'INSERT INTO "Aerei"("CompagniaAerea", "Modello", "AnnoCostruzione") VALUES ($1, $2, $3);';
    const result = await pool.query(sql, [airline, model, constructionyear]);
    return result.rowCount;
}

exports.updatePlane = async (id, inservice) => {
    const sql = 'UPDATE "Aerei" SET "InServizio" = $1 WHERE "IsActive" = true AND "IdAereo" = $2';
    const result = await pool.query(sql, [inservice, id]);
    return result.rowCount;
}

exports.deletePlane = async (id) => {
    const sql = 'UPDATE "Aerei" SET "IsActive" = false WHERE "IdAereo" = $1 AND "IsActive" = true';
    const reusult = await pool.query(sql, [id]);
    return reusult.rowCount;
}