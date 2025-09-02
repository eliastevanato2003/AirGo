const express = require("express");
const router = express.Router();
const userController= require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require("../middlewares/roleMiddleware")

/**
 * @route GET api/users/getUsers
 * @access role: 0
 * @description Restituisce le informazioni degli utenti che rispettano i filtri indicati
 * @id (Opzionale) L'id dell'utente
 * @name (Opzionale) Il nome dell'utente
 * @surname (Opzionale) Il cognome dell'utente
 * @email (Opzionale) L'email dell'utente
 * @returns {200} {object} Le info degli utenti 
 */
router.get("/getUsers", authenticateToken, authorizeRoles(0), userController.getUsers);

/**
 * @route GET /api/users/getUser
 * @access role: 0,2
 * @description Restituisce le proprie informazioni ad un utente autenticato
 * @returns {200} {object} Le info dell'utente 
 */
router.get("/getUser", authenticateToken, authorizeRoles(0,2), userController.getUser);

/**
 * @route POST /api/users/newUser
 * @description Crea un nuovo utente
 * @name Il nome dell'utente
 * @surname Il cognome dell'utente
 * @email L'email dell'utente, che deve essere univoca
 * @password La password dell'utente
 * @number Il numero di telefono dell'utente, che deve essere univoco
 * @dob La data di nascita dell'utente, in formato YYYY-MM-DD
 * @returns {200} {nuser: number} Il numero di utenti creati
 * @returns {400} {message: string} Dati mancanti
 * @returns {400} {message: string} Data non valida
 * @returns {409} {message: string} Dati già in uso
 * @returns {500} {message: string} Errore durante l'inserimento dell'email
 */ 
router.post("/newUser", userController.newUser);

/**
 * @route POST /api/users/updateUser
 * @access role: 2
 * @description Aggiorna i dati di un utente esistente
 * @name (Opzionale) Il nuovo nome dell'utente
 * @surname (Opzionale) Il nuovo cognome dell'utente
 * @email (Opzionale) La nuova email dell'utente, che deve essere univoca
 * @password (Opzionale) La nuova password dell'utente
 * @number (Opzionale) Il nuovo numero di telefono dell'utente, che deve essere univoco
 * @dob (Opzionale) La nuova data di nascita dell'utente, in formato YYYY-MM-DD
 * @returns {200} {nuser: number} Il numero di utenti aggiornati
 * @returns {400} {message: string} Data non valida
 * @returns {409} {message: string} Dati già in uso
 * @returns {500} {message: string} Utente da modificare non trovato
 */
router.post("/updateUser", authenticateToken, authorizeRoles(2), userController.updateUser);

/**
 * @route POST /api/users/deleteUser
 * @access role: 2
 * @description Cancella l'utente con cui si è fatto il login
 * @returns {200} Il numero di utenti cancellati
 */
router.post("/deleteUser", authenticateToken, authorizeRoles(2), userController.deleteUser);

/**
 * @route POST /api/users/login
 * @description Esegue il login come utente, admin o compagnia aerea
 * @email L'email con cui eseguire l'accesso
 * @password La password con cui eseguire l'accesso
 * @returns {200} {token: string} Il token di autorizzazione per le richieste successive
 * @returns {401} {message: string} Credenziali non valide
 */
router.post("/login", userController.login);

module.exports = router;
