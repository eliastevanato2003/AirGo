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

module.exports = router;