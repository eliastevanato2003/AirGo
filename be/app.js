const express = require("express");
const app = express();
const routes = require("./routes");

// Middleware globali
app.use(express.json()); // per body in JSON

// Rotte principali
app.use("/api", routes);  // tutte le API avranno prefisso /api

// Error handler di base
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

module.exports = app;