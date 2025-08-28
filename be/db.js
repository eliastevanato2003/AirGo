const { Pool } = require("pg");

const pool = new Pool({
  host: "airgodb",
  user: "admin",
  password: "prova",
  database: "AirGo",
  port: 5432,
});

pool.on("connect", () => {
  console.log("Connected to Postgres database");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

module.exports = pool;

