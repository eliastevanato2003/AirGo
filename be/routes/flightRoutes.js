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
 * @returns {400} {message: string} Uno o più parametri invalidi
 */
router.get("/getFlightRoutes", flightRoutesController.getFlightRoutes);

/**
 * @route POST /api/flightRoutes/newFlightRoute
 * @access role: 1
 * @description Crea una nuova rotta
 * @departure L'id dell'aeroporto di partenza
 * @arrival L'id dell'aeroporto di arrivo
 * @returns {200} {nflightroute: number} Il numero di rotte create
 * @returns {400} {message: string} Dati mancanti
 * @returns {400} {message: string} Aeroporto di partenza e destinazione uguali
 * @returns {400} {message: string} Aeroporto di partenza o destinazione non esistenti
 * @returns {400} {message: string} Dati non validi
 * @returns {409} {message: string} Rotta già esistente
 */
router.post("/newFlightRoute", authenticateToken, authorizeRoles(1), flightRoutesController.newFlightRoute);

/**
 * @route POST /api/flightRoutes/updateFlightRoute
 * @access role: 1
 * @description Aggiorna una rotta non utilizzata
 * @id L'id della rotta da aggiornare
 * @dep (Opzionale) L'id dell'aeroporto di partenza
 * @arr (Opzionale) L'id dell'aeroporto di destinazione
 * @returns {200} {nflightroute: number} IL numero di rotte aggiornate
 * @returns {400} {message: string} Id mancante
 * @returns {400} {message: string} Aeroporto di partenza e destinazione uguali
 * @returns {400} {message: string} Aeroporto di partenza o destinazione non esistenti
 * @returns {400} {message: string} Dati non validi
 * @returns {409} {message: string} Rotta già esistente
 * @returns {409} {message: string} Voli attivi utilizzanti questa rotta
*/
router.post("/updateFlightRoute", authenticateToken, authorizeRoles(1), flightRoutesController.updateFlightRoute);

/**
 * @route DELETE /api/flightRoutes/deleteFlightRoute
 * @acces role: 1
 * @description Elimina una rotta non utilizzata
 * @id L'id della rotta da eliminare
 * @returns {200} {nflightroute: number} Il numero di rotte eliminate
 * @returns {400} {message: string} Id mancante
 * @returns {400} {message: string} Dati non validi
 * @returns {409} {message: string} Voli attivi utilizzanti questa rotta
 */
router.delete("/deleteFlightRoute", authenticateToken, authorizeRoles(1), flightRoutesController.deleteFlightRoute);

module.exports = router;

