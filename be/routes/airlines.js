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
 * @email (Opzionale) L'email della compagnia aerea
 * @returns {200} {object} Le info delle compagnie aeree
 * @returns {400} {message: string} Dati non validi
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
 * @returns {200} {nairline: number} Il numero di compagnie aeree create
 * @returns {400} {message: string} Dati mancanti
 * @returns {400} {message: string} Dati non validi
 * @returns {409} {message: string} Dati già in uso
 * @returns {500} {message: string} Errore durante l'inserimento dell'email
 */ 
router.post("/newAirline", authenticateToken, authorizeRoles(0), airlineController.newAirline);

/**
 * @route POST /api/airlines/updateAirline
 * @access role: 1
 * @description Aggiorna i dati di una compagnia aerea esistente
 * @name (Opzionale) Il nuovo nome della compagnia aerea
 * @identificationcode (Opzionale) Il nuovo codice identificativo della compagnia aerea, che deve essere univoco
 * @email (Opzionale) La nuova email della compagnia aerea, che deve essere univoca
 * @password (Opzionale) La nuova password della compagnia aerea
 * @returns {200} {nairline: number} Il numero di compagnie aeree modificate
 * @returns {400} {message: string} Dati non validi
 * @returns {409} {message: string} Dati già in uso
 * @returns {500} {message: string} Compagnia aerea da modificare non trovata
 */
router.post("/updateAirline", authenticateToken, authorizeRoles(1), airlineController.updateAirline);

/**
 * @route DELETE /api/airlines/deleteAirline
 * @acces role: 0
 * @description Impedisce il login alla compagnia aerea selezionata
 * @id L'id della compagnia aerea da cancellare
 * @returns {200} {nairline: number} Il numero di compagnie aeree cancellate
 * @returns {400} {message: string} Dati non validi
 * @returns {400} {message: string} Compagnia non trovata
 * @returns {409} {message: string} Voli attivi
 */
router.delete("/deleteAirline", authenticateToken, authorizeRoles(0), airlineController.deleteAirline);

/**
 * @route POST /api/airlines/activateAirline
 * @description Permette di attivare una compagnia aerea attivata
 * @email L'email della compagnia aerea da attivare
 * @pw1 La nuova password
 * @pw2 La nuova password, conferma
 * @temp Il codice temporaneo
 * @returns {200} {nairline: number} Il numero di compagnie aeree attivate
 * @returns {400} {message: string} Dati non validi
 * @returns {400} {message: string} Dati mancanti
 * @returns {400} {message: string} Password non coincidenti
 */
router.post("/activateAirline", airlineController.activateAirline);

/**
 * @route GET /api/airlines/getStatsRoute
 * @description Restituisce le statistiche sulle rotte della compagnia aerea autenticata
 * @returns {200} {object} Le statistiche di ogni rotta
 */
router.get("/getStatsRoute", authenticateToken, authorizeRoles(1), airlineController.getStatsRoute);

/**
 * @route GET /api/airlines/getStatsFlight
 * @description Restituisce le statistiche dei voli della rotta indicata della compagnia aerea autenticata
 * @returns {200} {object} Le statistiche di ogni volo
 * @returns {400} {message: string} Rotta non trovata
 */
router.get("/getStatsFlight", authenticateToken, authorizeRoles(1), airlineController.getStatsFlight);


module.exports = router;