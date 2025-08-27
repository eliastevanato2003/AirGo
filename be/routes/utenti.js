const express = require("express");
const router = express.Router();
const utentiController = require('../controllers/utentiController')

router.get("/prova", utentiController.searchFlights);

module.exports = router;
