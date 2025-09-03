const pool = require("../db");

exports.getModels = async (id, name) => {
    const sql = 'SELECT * FROM "Modelli" WHERE ("IdModello" = $1 OR $1 IS NULL) AND ("Nome" = $2 OR $2 IS NULL) AND "IsActive" = true';
    const result = await pool.query(sql, [id, name]);
    return result.rows;
}

exports.newModel = async (name, seatspc, rowsb, columnsb, rowse, columnse) => {
    const sql = 'INSERT INTO "Modelli" ("Nome", "PostiPc", "RigheB", "ColonneB", "RigheE", "ColonneE") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const result = await pool.query(sql, [name, seatspc, rowsb, columnsb, rowse, columnse]);
    return result.rows;
}

exports.updateModel = async (id, name, seatspc, rowsb, columnsb, rowse, columnse) => {
    const sql = 'UPDATE "Modelli" SET "Nome" = $1, "PostiPc" = $2, "RigheB" = $3, "ColonneB" = $4, "RigheE" = $5, "ColonneE" = $6 WHERE "IdModello" = $7 AND "IsActive" = true';
    const result = await pool.query(sql, [name, seatspc, rowsb, columnsb, rowse, columnse, id]);
    return result.rowCount;
}

exports.deleteModel = async (id) => {
    const sql = 'UPDATE "Modelli" SET "IsActive" = false WHERE "IdModello" = $1 AND "IsActive" = true';
    const result = await pool.query(sql, [id]);
    return result.rowCount;
}