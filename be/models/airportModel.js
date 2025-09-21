const pool = require("../db");

exports.getAirports = async (id, city, country, identificationcode) => {
    const sql = 'SELECT * FROM "Aeroporti" WHERE ("IdAeroporto" = $1 OR $1 IS NULL) AND ("Citta" = $2 OR $2 IS NULL) AND ("Nazione" = $3 OR $3 IS NULL) AND ("CodiceIdentificativo" = $4 OR $4 IS NULL) AND "IsActive" = true';
    const result = await pool.query(sql, [id, city, country, identificationcode]);
    return result.rows;
}

exports.getAirportsLike = async (city) => {
    const pattern = `${city}%`
    const sql = 'SELECT * FROM "Aeroporti" WHERE "Citta" LIKE $1 AND "IsActive" = true';
    const result = await pool.query(sql, [pattern]);
    return result.rows;
}

exports.newAirport = async (city, country, name, identificationcode) => { 
    const sql = 'INSERT INTO "Aeroporti"("Citta", "Nazione", "Nome", "CodiceIdentificativo") VALUES ($1, $2, $3, $4);'
    const result = await pool.query(sql, [city, country, name, identificationcode]);
    return result.rowCount;
}

exports.updateAirport = async (id, city, country, name, identificationcode) => {
    const sql = 'UPDATE "Aeroporti" SET "Citta"=$1, "Nazione"=$2, "Nome"=$3, "CodiceIdentificativo"=$4 WHERE "IdAeroporto" = $5 AND "IsActive" = true;'
    const result = await pool.query(sql, [city, country, name, identificationcode, id]);
    return result.rowCount;
}

exports.deleteAirport = async (id) => {
    const sql = 'UPDATE "Aeroporti" SET "IsActive" = false WHERE "IdAeroporto" = $1 AND "IsActive" = true';
    const result = await pool.query(sql, [id]);
    return result.rowCount;
}

