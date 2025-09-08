const express = require("express");
const router = express.Router();
const modelController = require('../controllers/modelController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require("../middlewares/roleMiddleware")

/**
 * @route GET api/models/getModels
 * @description Restituisce le informazioni dei modelli che rispettano i filtri indicati
 * @id (Opzionale) L'id del modello
 * @name (Opzionale) Il nome del modelloe
 * @returns {200} {object} Le info del modello
 * @returns{400} {message: string} Uno o più parametri invalidi 
 */
router.get("/getModels", modelController.getModels);

/**
 * @route POST /api/models/newModel
 * @description Crea un nuovo modello
 * @access role: 0,1
 * @name Il nome del modello
 * @seatspc Il numero di posti in prima classe
 * @rowsb Il numero di righe in business
 * @columnsb Il numero di colonne inn business, deve essere pari
 * @rowse Il numero di righe in economy
 * @columnse Il numero di colonne in economy, deve essere pari
 * @extralegrows Array con le righe con spazio extra per le gambe
 * @returns {200} {nmodel: number, nextraleg: number} Il numero di modelli e righe con spazio extra per le gambe creati
 * @returns {400} {message: string} Dati mancanti
 * @returns {400} {message: string} Dati non validi
 * @returns {409} {message: string} Nome già in uso
 * @returns {500} {message: string} Errore durante l'inserimento del modello
 */ 
router.post("/newModel", authenticateToken, authorizeRoles(0, 1), modelController.newModel);

module.exports = router;