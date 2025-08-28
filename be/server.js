const app = require("./app");
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


/*
const { Pool } = require("pg");

const pool = new Pool({
  host: "airgodb",
  user: "admin",
  password: "prova",
  database: "AirGo",
  port: 5432,
});

app.get("/db", async (req, res) => {
  try {
    const result = await pool.query('INSERT INTO public."Prova"("Voli")	VALUES (2);');
    res.json({ server_time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Errore connessione DB");
  }
});
*/