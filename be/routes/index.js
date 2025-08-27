const express = require("express");
const router = express.Router();

// Importo tutte le sub-routes
const routeUtenti = require("./utenti");

// Registro i moduli sotto un prefisso
router.use("/utenti", routeUtenti)

module.exports = router;