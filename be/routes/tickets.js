const express = require("express");
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require("../middlewares/roleMiddleware")

/**
 * @route GET api/tickets/getTickets
 * @description Restituisce le informazioni dei biglietti che rispettano i filtri indicati
 * @id (Opzionale) L'id del biglietto
 * @airline (Opzionale) La compagnia aerea proprietaria del volo, caricato automaticamente in caso di role 1
 * @user (Opzionale) L'utente che ha acquistato il biglietto, caricato automaticamente in caso di role 2
 * @flight (Opzionale) Il volo per cui è stato acquistato il biglietto
 * @row (Opzionale) La riga selezionata per il posto
 * @col (Opzionale) La colonna selezionata per il posto
 * @clas (Opzionale) La classe del biglietto
 * @returns {200} {object} Le info dei biglietti
 * @returns {400} {message: string} Uno o più parametri non validi
 */
router.get("/getTickets", authenticateToken, ticketController.getTickets);

/**
 * @route POST /api/tickets/newTicket
 * @access role: 2
 * @description Crea un nuovo biglietto
 * @flight L'id del volo
 * @name Il nome del titolare del biglietto
 * @surname Il cognome del titolare del biglietto
 * @dob La data di nascita del titolare del biglietto, in formato YYYY-MM-DD
 * @clas La classe del biglietto, ovvero una stringa tra "Economy", "Business" e "Prima"
 * @nextrabag Il numero di bagagli aggiuntivi
 * @chseat True se viene richiesta la scelta del posto, false altrimenti
 * @price Il costo totale del biglietto, che deve corrispondere a quello calcolato
 * @row La riga del posto (Ignorata con chseat a false)
 * @col La colonna del posto (Ignorata con chseat a false)
 * @returns {200} {nusers: number} Il numero di voli creati
 * @returns {400} {message: string} Dati mancanti
 * @returns {400} {message: string} Dati non validi
 * @returns {400} {message: string} Data non valida
 * @returns {400} {message: string} Posto scelto mancante
 * @returns {400} {message: string} Classe non valida
 * @returns {400} {message: string} Posto non valido
 * @returns {400} {message: string} Prezzo non corretto
 * @returns {400} {message: string} Volo non trovato
 * @returns {409} {message: string} Posti nella classe selezionata esauriti
 * @returns {409} {message: string} Posto occupato
 */ 
router.post("/newTicket", authenticateToken, authorizeRoles(2), ticketController.newTicket);

/**
 * @route POST /api/tickets/updateTicket
 * @access role: 2
 * @description Permette di aggiornare l'intestatario di un biglietto di un volo non ancora partito
 * @id L'id del biglietto da aggiornare
 * @name Il nuovo nome dell'intestatario
 * @surname Il nuovo cognome dell'intestatario
 * @dob La nuova data di nascita dell'intestatario
 * @returns {200} {nticket: number} Il numero di biglietti aggiornati
 * @returns {400} {message: string} Dati mancanti
 * @returns {400} {message: string} Dati non validi
 * @returns {409} {message: string} Biglietto non trovato
 * @returns {409} {message: string} Aereo già partito
 */
router.post("/updateTicket", authenticateToken, authorizeRoles(2), ticketController.updateTicket);

/**
 * @route POST /api/tickets/addExtraBag
 * @access role: 2
 * @description Permette di aggiungere bagagli extra
 * @id L'id del biglietto a cui aggiungere bagagli extra
 * @nextrabag Il numero di bagagli da aggiungere
 * @price Il nuovo prezzo del biglietto, che deve coincidere con quello calcolato
 * @returns {200} {nticket: number} Il numero di biglietti aggiornati
 * @returns {400} {message: string} Dati mancanti
 * @returns {409} {message: string} Prezzo non corretto
 * @returns {400} {message: string} Dati non validi
 * @returns {409} {message: string} Biglietto non trovato
 * @returns {409} {message: string} Aereo già partito
 * 
 */
router.post("/addExtraBag", authenticateToken, authorizeRoles(2), ticketController.addExtraBag);

/**
 * @route DELETE /api/tickets/deleteTicket
 * @access role: 1
 * @description Permette di cancellare un biglietto
 * @id L'id del biglietto da cancellare
 * @returns {200} {nticket: number} Il numero di biglietti cancellati
 * @returns {400} {message: string} Id mancante
 * @returns {400} {message: string} Dati non validi
 * @returns {409} {message: string} Biglietto non trovato
 * @returns {409} {message: string} Aereo già partito
 */
router.delete("/deleteTicket", authenticateToken, authorizeRoles(1), ticketController.deleteTicket);

module.exports = router;