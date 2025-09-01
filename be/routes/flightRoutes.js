const express = require("express");
const router = express.Router();
const flightRoutesController = require('../controllers/fligthRouteController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require("../middlewares/roleMiddleware")

/**
 * @route GET api/flightRoutes/getFlightRoutes
 * @description Restituisce le informazioni delle rotte che rispettano i filtri indicati
 * @id (Opzionale) L'id della rotta
 * @departure (Opzionale) L'id dell'aeroporto di partenza
 * @arrival (Opzionale) L'id dell'aeroporto di arrivo
 * @airline (Opzionale) L'id della compagnia aerea della rotta
 * @returns {200} {object} Le info delle rotte 
 */
router.get("/getFlightRoutes", flightRoutesController.getFlightRoutes);

/**
 * @route POST /api/flightRoutes/newFlightRoute
 * @access role: 1
 * @description Crea una nuova rotta
 * @departure L'id dell'aeroporto di partenza
 * @arrival L'id dell'aeroporto di arrivo
 * @returns {200} {nusers: number} Il numero di rotte create
 * @returns {400} {message: string} Dati mancanti
 * @returns {400} {message: string} Aeroporto di partenza e destinazione uguali
 * @returns {400} {message: string} Aeroporto di partenza o destinazione non esistenti
 * @returns {409} {message: string} Rotta già esistente
 */ 
router.post("/newFlightRoute", authenticateToken, authorizeRoles(1), flightRoutesController.newFlightRoute);

module.exports = router;

