const express = require("express");
const router = express.Router();
const userController= require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require("../middlewares/roleMiddleware")

/**
 * @route GET api/users/getUsers
 * 
 */
router.get("/getUsers", authenticateToken, authorizeRoles(0),userController.getUsers);

/**
 * @route GET /api/users/getUser
 * @description Restituisce le proprie informazioni ad un utente autenticato
 * @returns {200} {object} Le info dell'utente 
 */
router.get("/getUser", authenticateToken, userController.getUser);

/**
 * @route POST /api/users/login
 * @description Crea un nuovo utente
 * @name Il nome dell'utente
 * @surname Il cognome dell'utente
 * @email L'email dell'utente, che deve essere univoca
 * @password La password dell'utente
 * @number Il numero di telefono dell'utente, che deve essere univoco
 * @dob La data di nascita dell'utente 
 * @returns {200} {nutenti: number} Il numero di utenti creati
 * @returns {400} {error: string} Dati mancanti
 * @returns {409} {error: string} Dati già in uso
 */ 
router.post("/newUser", userController.newUser);

router.post("/login", userController.login);

module.exports = router;
