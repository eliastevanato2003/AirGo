const express = require("express");
const router = express.Router();
const airlineController = require('../controllers/airlineController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require("../middlewares/roleMiddleware")

/**
 * @route GET api/airlines/getAirlines
 * @access role: 0
 * @description Restituisce le informazioni delle compagnie aeree
 * @id (Opzionale) L'id della compagnia aerea
 * @name (Opzionale) Il nome della compagnia aerea
 * @identificationcode (Opzionale) Il codice identificativo della compagnia aerea
 * @email (Opzionale) L'email dell'utente, che deve essere univoca
 * @returns {200} {object} Le info delle compagnie aeree
 */
router.get("/getAirlines", authenticateToken, authorizeRoles(0), airlineController.getAirlines);

/**
 * @route GET /api/airlines/getAirline
 * @access role: 1
 * @description Restituisce le proprie informazioni ad una compagnia aerea autenticata
 * @returns {200} {object} Le info della compagnia aerea 
 */
router.get("/getAirline", authenticateToken, authorizeRoles(1), airlineController.getAirline);

/**
 * @route POST /api/airlines/newAirline
 * @access role: 0
 * @description Crea una nuova compagnia aerea
 * @name Il nome della compagnia aerea
 * @identificationcode Il codice identificativo della compagnia aerea, che deve essere univoco
 * @email L'email della compagnia aerea, che deve essere univoca
 * @password La password della compagnia aerea
 * @returns {200} {nairlines: number} Il numero di compagnie aeree create
 * @returns {400} {message: string} Dati mancanti
 * @returns {409} {message: string} Dati già in uso
 */ 
router.post("/newAirline", authenticateToken, authorizeRoles(0), airlineController.newAirline);

module.exports = router;