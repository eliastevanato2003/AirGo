const express = require("express");
const router = express.Router();
const airportController = require('../controllers/airportController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require("../middlewares/roleMiddleware")

/**
 * @route GET api/airports/getAirports
 * @description Restituisce le informazioni degli aeroporti che rispettano i filtri indicati
 * @id (Opzionale) L'id dell'aeroporto
 * @city (Opzionale) La città dell'aeroporto
 * @country (Opzionale) La nazione dell'aeroporto
 * @identificationcode (Opzionale) Il codice identificativo dell'aeroporto
 * @returns {200} {object} Le info degli aeroporti 
 */
router.get("/getAirports", airportController.getAirports);

/**
 * @route POST /api/airports/newAirport
 * @description Crea un nuovo aeroporto
 * @city La città dell'aeroporto
 * @country La nazione dell'aeroporto
 * @name Il nome dell'aeroporto
 * @identificationcode Il codice identificativo dell'aeroporto, che deve essere univoco
 * @returns {200} {nusers: number} Il numero di aeroporti creati
 * @returns {400} {message: string} Dati mancanti
 * @returns {409} {message: string} Codice identificativo già in uso
 */ 
router.post("/newAirport", authenticateToken, authorizeRoles(0,1), airportController.newAirport);

router.post("/updateAirport", authenticateToken, authorizeRoles(0,1), airportController.updateAirport);

router.post("/deleteAirport", authenticateToken, authorizeRoles(0,1), airportController.deleteAirport);

module.exports = router;