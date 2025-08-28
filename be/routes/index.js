const express = require("express");
const router = express.Router();

// Importo tutte le sub-routes
const userRoutes = require("./users");

// Registro i moduli sotto un prefisso
router.use("/useers", userRoutes)

module.exports = router;