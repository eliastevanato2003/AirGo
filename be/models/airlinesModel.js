const pool = require("../db");

exports.getUsers = async (name, surname, email) => {
    const sql = 'SELECT * FROM "CompagnieAeree" WHERE ("Nome" = $1 OR $1 IS NULL) AND ("Cognome" = $2 OR $2 IS NULL) AND ("Email" = $3 OR $3 IS NULL) AND "IsActive" = true';
    const result = await pool.query(sql, [name, surname, email]);
    return result.rows;
};