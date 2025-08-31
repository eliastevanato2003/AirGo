const pool = require("../db");

exports.newAirport = async (city, country, name, identificationcode) => { 
    const sql = 'INSERT INTO "Aeroporti"("Citta", "Nazione", "Nome", "CodiceIdentificativo") VALUES ($1, $2, $3, $4);'
    const result = await pool.query(sql, [city, country, name, identificationcode]);
    return result.rowCount;
}