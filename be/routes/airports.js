const express = require("express");
const router = express.Router();
const airportController = require('../controllers/airportController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require("../middlewares/roleMiddleware")

/**
 * @route GET /api/airports/getAirports
 * @description Restituisce le informazioni degli aeroporti che rispettano i filtri indicati
 * @id (Opzionale) L'id dell'aeroporto
 * @city (Opzionale) La città dell'aeroporto
 * @country (Opzionale) La nazione dell'aeroporto
 * @identificationcode (Opzionale) Il codice identificativo dell'aeroporto
 * @returns {200} {object} Le info degli aeroporti 
 * @returns {400} {message: string} Uno o più parametri invalidi 
 */
router.get("/getAirports", airportController.getAirports);

/**
 * @route POST /api/airports/newAirport
 * @access role: 0
 * @description Crea un nuovo aeroporto
 * @city La città dell'aeroporto
 * @country La nazione dell'aeroporto
 * @name Il nome dell'aeroporto
 * @identificationcode Il codice identificativo dell'aeroporto, che deve essere univoco
 * @returns {200} {nairport: number} Il numero di aeroporti creati
 * @returns {400} {message: string} Dati mancanti
 * @returns {400} {message: string} Dati non validi
 * @returns {409} {message: string} Codice identificativo già in uso
 */
router.post("/newAirport", authenticateToken, authorizeRoles(0), airportController.newAirport);

/**
 * @route POST /api/airports/updateAirport
 * @access role: 0, 1
 * @description Aggiorna le informazioni di un aeroporto esistente
 * @id L'id dell'aeroporto da modificare
 * @city (Opzionale) La nuova città dell'aeroporto
 * @county (Opzionale) La nuova nazione dell'aeroporto
 * @name (Opzionale) Il nuovo nome dell'aeroporto
 * @identificationcode (Opzionale) Il nuovo codice identificativo dell'aeroporto, che deve essere univoco
 * @returns {200} {nairport: number} Il numero di aeroporti aggiornati
 * @returns {409} {message: string} Codice identificativo già in uso
 * @returns {409} {message: string} Aeroporto in uso in rotte attive
 * @returns {500} {message: string} Aeroporto da aggiornare non trovato
 * @returns {500} {message: string} Trovati aeroporti multipli con l'id indicato
 */
router.post("/updateAirport", authenticateToken, authorizeRoles(0, 1), airportController.updateAirport);

/**
 * @route POST /api/airports/deleteAirport
 * @access role: 0, 1
 * @description Cancella un aeroporto
 * @id L'id dell'aeroporto da cancellare
 * @returns {200} {nairport: number} Il numero di aeroporti cancellati
 * @returns {400} {message: string} Id mancante
 * @returns {409} {message: string} Aeroporto in uso in rotte attive
 */
router.post("/deleteAirport", authenticateToken, authorizeRoles(0, 1), airportController.deleteAirport);

module.exports = router;