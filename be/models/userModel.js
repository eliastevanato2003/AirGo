const pool = require("../db");

exports.getUsers = async () => {
    const result = await pool.query('SELECT * FROM "Utenti" WHERE "IsActive" = true');
    return result.rows; 
};

