const express = require("express");
const router = express.Router();
const modelController = require('../controllers/modelController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require("../middlewares/roleMiddleware")

/**
 * @route GET api/models/getModels
 * @description Restituisce le informazioni dei modelli che rispettano i filtri indicati
 * @id (Opzionale) L'id del modello
 * @name (Opzionale) Il nome del modello
 * @returns {200} {object} Le info del modello
 * @returns {400} {message: string} Uno o più parametri invalidi 
 */
router.get("/getModels", modelController.getModels);

/**
 * @route POST /api/models/newModel
 * @description Crea un nuovo modello
 * @access role: 0,1
 * @name Il nome del modello, che deve essere univoco
 * @seatspc Il numero di posti in prima classe
 * @rowsb Il numero di righe in business
 * @columnsb Il numero di colonne in business, deve essere pari
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

/**
 * @route POST /api/models/updateModel
 * @description Aggiorna un modello non utilizzato
 * @access role: 0,1
 * @id L'id del modello da modificare
 * @name (Opzionale) Il nuovo nome del modello, che deve essere univoco
 * @seatspc (Opzionale) Il nuovo numero di posti in prima classe
 * @rowsb (Opzionale) Il numero nuovo di righe in business
 * @columnsb (Opzionale) Il nuovo numero di colonne in business, deve essere pari
 * @rowse (Opzionale) Il nuovo numero di righe in economy
 * @columnse (Opzionale) Il nuovo numero di colonne in economy, deve essere pari
 * @extralegrows (Opzionale) Array con le nuove righe con spazio extra per le gambe
 * @returns {200} {nmodel: number, nextraleg: number} Il numero di modelli aggiornati e il nuovo numero di righe con spazio extra per le gambe
 * @returns {400} {message: string} Id mancante
 * @returns {400} {message: string} Dati non validi
 * @returns {400} {message: string} Modello non trovato
 * @returns {409} {message: string} Nome già in uso
 * @returns {409} {message: string} Aerei esistenti utilizzanti questo modello
 */ 
router.post("/updateModel", authenticateToken, authorizeRoles(0,1), modelController.updateModel);

/**
 * @route DELETE /api/models/deleteModel
 * @description Elimina un modello non utilizzato
 * @access role: 0
 * @id L'id del modello da eliminare
 * @returns {200} {nmodel: number} Il numero di modelli eliminati
 * @returns {400} {message: string} Id mancante
 * @returns {400} {message: string} Dati non validi
 * @returns {409} {message: string} Aerei esistenti utilizzanti questo mode
 */
router.delete("/deleteModel", authenticateToken, authorizeRoles(0), modelController.deleteModel);

module.exports = router;