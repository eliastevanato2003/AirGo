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
 * @status (Opzionale) Lo stato dell'aereo (Programmato, Decollato, Atterrato, Cancellato), di default a Programmato
 * @returns {200} {object} Le info dei voli
 * @returns {400} {message: string} Data invalida 
 * @returns {400} {message: string} Uno o più parametri invalidi
 */
router.get("/getFlights", flightController.getFlights);

/**
 * @route GET api/flights/getFlightStatus
 * @description Restituisce le informazioni sullo stato dei posti del volo indicato
 * @id L'id del volo
 * @returns {200} {object} Le info del volo
 * @returns {400} {message: string} Id mancante
 * @returns {400} {message: string} Parametro invalido
 * @returns {404} {message: string} Volo non trovato
 */
router.get("/getFlightStatus", flightController.getFlightStatus);

/**
 * @route POST /api/flights/newFlight
 * @access role: 1
 * @description Crea un nuovo volo
 * @plane L'id dell'aereo utilizzato
 * @route L'id della rotta coperta
 * @schdepdate La data di partenza prevista, in formato YYYY-MM-DDThh:mm:ss.sss
 * @scharrdate La data di arrivo prevista, in formato YYYY-MM-DDThh:mm:ss.sss
 * @pcprice Costo posto in prima classe
 * @bprice Costo posto in classe business
 * @eprice Costo posto in economy
 * @bagprice Costo bagaglio extra
 * @lrprice Costo spazio aggiuntivo per le gambe
 * @scprice Costo scelta posto
 * @returns {200} {nusers: number} Il numero di voli creati
 * @returns {400} {message: string} Dati mancanti
 * @returns {400} {message: string} Dati non validi
 * @returns {400} {message: string} Data non valida
 * @returns {400} {message: string} Prezzi inferiori a 0
 * @returns {409} {message: string} Aereo non esistente
 * @returns {409} {message: string} Rotta non esistente
 * @returns {409} {message: string} Date nel passato
 */ 
router.post("/newFlight", authenticateToken, authorizeRoles(1), flightController.newFlight);

/**
 * @route POST /api/flights/departure
 * @access role: 1
 * @description Imposta lo stato a decollato e segna l'orario
 * @id L'id del volo decollato
 * @returns {200} {nflight: number} Il numero di voli decollati
 * @returns {400} {message: string} Id mancante
 * @returns {400} {message: string} Dati non validi
 * @returns {400} {message: string} Volo non esistente
 */
router.post("/departure", authenticateToken, authorizeRoles(1), flightController.departure);

/**
 * @route POST /api/flights/arrival
 * @access role: 1
 * @description Imposta lo stato a atterrato e segna l'orario
 * @id L'id del volo atterrato
 * @returns {200} {nflight: number} Il numero di voli atterrati
 * @returns {400} {message: string} Id mancante
 * @returns {400} {message: string} Dati non validi
 * @returns {400} {message: string} Volo non esistente
 */
router.post("/arrival", authenticateToken, authorizeRoles(1), flightController.arrival);

/**
 * @route POST /api/flights/updateEffDate
 * @access role: 1
 * @description Modifica gli orari di decollo e atterraggio di un volo già atterrato
 * @id L'id del volo da modificare
 * @effdepdate La nuova data di partenza effettiva, in formato YYYY-MM-DDThh:mm:ss.sss
 * @effarrdate La nuova data di arrivo effettiva, in formato YYYY-MM-DDThh:mm:ss.sss
 * @returns {200} {nflight: number} Il numero di voli modificati
 * @returns {400} {message: string} Id mancante
 * @returns {400} {message: string} Dati non validi
 * @returns {400} {message: string} Data non valida
 * @returns {400} {message: string} Volo non esistente
 * @returns {409} {message: string} Volo programmato o decollato
 * @returns {409} {message: string} Date nel futuro
 * @returns {409} {message: string} Data di partenza successiva alla data di arrivo
 */
router.post("/updateEffDate", authenticateToken, authorizeRoles(1), flightController.updateEffDate);

/**
 * @route POST /api/flights/updatePrices
 * @access role: 1
 * @description Modifica i prezzi per un volo programmato
 * @id L'id del volo da modificare
 * @pcprice Il nuovo costo di un posto in prima classe
 * @bprice Il nuovo costo di un posto in business
 * @eprice Il nuovo costo di un posto in economy
 * @returns {200} {nflight: number} Il numero di voli modificati
 * @returns {400} {message: string} Id mancante
 * @returns {400} {message: string} Dati non validi
 * @returns {400} {message: string} Volo non esistente
 * @returns {409} {message: string} Prezzi inferiori a 0
 */
router.post("/updatePrices", authenticateToken, authorizeRoles(1), flightController.updatePrices);

/**
 * @route DELETE /api/flights/deleteFlight
 * @access role: 1
 * @description Elimina un volo senza biglietti acquistati
 * @id L'id del volo da eliminare
 * @returns {200} {nflight: number} Il numero di voli eliminati
 * @returns {400} {message: string} Id mancante
 * @returns {400} {message: string} Dati non validi
 * @returns {400} {message: string} Volo non esistente
 * @returns {409} {message: string} Biglietti acquistati per questo volo
 */
router.delete("/deleteFlight", authenticateToken, authorizeRoles(1), flightController.deleteFlight);

/**
 * @route POST /api/flights/cancelFlight
 * @access role: 1
 * @description Mette un volo a stato cancellato
 * @id L'id del volo da cancellare
 * @returns {200} {nflight: number} Il numero di voli cancellati
 * @returns {400} {message: string} Id mancante
 * @returns {400} {message: string} Dati non validi
 * @returns {400} {message: string} Volo non esistente
 */
router.post("/cancelFlight", authenticateToken, authorizeRoles(1), flightController.cancelFlight);

/**
 * @route POST /api/flights/assignSeats
 * @access role: 1
 * @description Assegna i posti casualmente agli utenti ancora senza
 * @id L'id dell'aereo a cui assegnare i posti
 * @returns {200} {nticket: number} Il numero di posti assegnati
 * @returns {400}
 */
router.post("/assignSeats", authenticateToken, authorizeRoles(1), flightController.assignSeats);

module.exports = router;
