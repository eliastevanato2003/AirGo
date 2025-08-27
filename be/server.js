const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});


/*
const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Ciao dal backend Node.js con Express!");
});

app.get("/api", (req, res) => {
  res.json({ message: "Godo" });
});

app.get("/a", (req, res) => {
  res.json({ message: "Godo" });
});

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});



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