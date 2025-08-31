const pool = require("../db");

exports.newModel = async (name, seatspc, rowsb, columnsb, rowse, columnse, extralegrows) => {
    const sql1 = 'INSERT INTO "Modelli" ("Nome", "PostiPc", "RigheB", "ColonneB", "RigheE", "ColonneE") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const result1 = await pool.query(sql1, [name, seatspc, rowsb, columnsb, rowse, columnse]);
    if (result1.rowCount == 1) {
        extralegrows.forEach(async (row) => {
            if (row <= rowse || row > 0) {
                const sql2 = 'INSERT INTO "RigheExtraLegRoom" ("Modello", "NRiga") VALUES($1, $2)';
                await pool.query(sql2, [result1.rows[0].IdModello, row]);
            }
        });
        return result1.rowCount;
    } else {
        throw Error("Error during model insertion");
    }
}