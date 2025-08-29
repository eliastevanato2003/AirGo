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
 * @email (Opzionale) L'email dell'utente, che deve essere univoca
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
 * @dob La data di nascita dell'utente 
 * @returns {200} {nusers: number} Il numero di utenti creati
 * @returns {400} {error: string} Dati mancanti
 * @returns {409} {error: string} Dati già in uso
 */ 
router.post("/newUser", userController.newUser);

//Riguarda info caricate x compagnia aerea
router.post("/login", userController.login);

module.exports = router;
