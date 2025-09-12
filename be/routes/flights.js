const express = require("express");
const router = express.Router();
const flightController = require('../controllers/flightController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require("../middlewares/roleMiddleware")

/**
 * @route GET api/flights/getFlights
 * @description Restituisce le informazioni dei voli che rispettano i filtri indicati
 * @id (Opzionale) L'id del volo
 * @airline (Opzionale) L'id della compagnia aerea
 * @departure (Opzionale) L'id dell'aeroporto di partenza
 * @arrival (Opzionale) L'id dell'aeroporto di arrivo
 * @datedeparture (Opzionale) La data di partenza, considerata solo in caso di valori undefined su mindatedeparture e maxdatedeparture, in formato YYYY-MM-DD
 * @datearrival (Opzionale) La data di arrivo, considerata solo in caso di valori undefined su mindatearrival e maxdatearrival, in formato YYYY-MM-DD
 * @mindatedeparture (Opzionale) La data minima di partenza, in formato YYYY-MM-DD
 * @maxdatedeparture (Opzionale) La data massima di partenza, in formato YYYY-MM-DD
 * @mindatearrival (Opzionale) La data minima di arrivo, in formato YYYY-MM-DD
 * @maxdatearrival (Opzionale) La data massima di arrivo, in formato YYYY-MM-DD
 * @order (Opzionale) L'ordine: 1 per CostoEconomy ASC, 2 per CostoEconomy DESC, 3 per DataPartenzaPrev ASC, 4 per DataPartenzaPrev DESC
 * @plane (Opzionale) L'id dell'aereo
 * @returns {200} {object} Le info dei voli
 * @returns {400} {message: string} Data invalida 
 * @returns {400} {message: string} Uno o più parametri invalidi
 */
router.get("/getFlights", flightController.getFlights);


/**
 * @route POST /api/flights/newFlight
 * @access role: 1
 * @description Crea un nuovo volo
 * @plane L'id dell'aereo utilizzato
 * @route L'id della rotta coperta
 * @schdepdate La data di partenza prevista, in formato YYYY-MM-DDThh:mm:ss.sss
 * @scharrdate La data di arrivo prevista, in formato YYYY-MM-DDThh:mm:ss.sss
 * @pcprize Costo posto in prima classe
 * @bprize Costo posto in classe business
 * @eprize Costo posto in economy
 * @bagprize Costo bagaglio extra
 * @lrprize Costo spazio aggiuntivo per le gambe
 * @scprize Costo scelta posto
 * @returns {200} {nusers: number} Il numero di voli creati
 * @returns {400} {message: string} Dati mancanti
 * @returns {400} {message: string} Dati non validi
 * @returns {400} {message: string} Data non valida
 * @returns {409} {message: string} Aereo non esistente
 * @returns {409} {message: string} Rotta non esistente
 */ 
router.post("/newFlight", authenticateToken, authorizeRoles(1), flightController.newFlight);

router.get("/getFlightStatus", authenticateToken, flightController.getFlightStatus);

module.exports = router;