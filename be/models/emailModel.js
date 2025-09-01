const pool = require("../db")

exports.getEmails = async (id, email) => {
    const sql = 'SELECT * FROM "IndirizziEmail" WHERE ("IdEmail" = $1 OR $1 IS NULL) AND ("Email" = $2 ORE $2 IS NULL) AND "IsActive" = true';
    const result = await pool.query(sql, [id, email]);
    return result.rows;
}

exports.newEmail = async (email) => {
    const sql = 'INSERT INTO "IndirizziEmail" ("Email") VALUES ($1) RETURNING *';
    const result = await pool.query(sql, [email]);
    return result.rows;
}

exports.updateEmail = async (id, email) => {
    const sql = 'UPDATE "IndirizziEmail" SET "Email" = $1 WHERE "IdEmail" = $2 AND "IsActive" = true';
    const result = await pool.query(sql, [email, id]);
    return result.rowCount;
}

exports.deactivateEmail = async (email) => {
    const sql = 'UPDATE "IndirizziEmail" SET "IsActive" = false WHERE "Email" = $1 AND "IsActive" = true'
    const result = await pool.query(sql, [email]);
    return result.rowCount;
}

exports.deleteEmail = async (email) => {
    const sql = 'DELETE FROM "IndirizziEmail" WHERE "Email" = $1 AND "IsActive" = true';
    const result = await pool.query(sql, [email]);
    return result.rowCount;
}