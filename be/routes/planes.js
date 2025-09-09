const express = require("express");
const router = express.Router();
const planeController = require('../controllers/planeController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require("../middlewares/roleMiddleware")

/**
 * @route GET api/planes/getPlanes
 * @description Restituisce le informazioni degli aerei che rispettano i filtri indicati
 * @id (Opzionale) L'id dell'aereo
 * @airline (Opzionale) L'id della compagnia aerea proprietaria
 * @model (Opzionale) L'id del modello dell'aereo
 * @costructionyear (Opzionale) L'anno di costruzione dell'aereo
 * @returns {200} {object} Le info dell'aereo
 * @returns {400} {message: string} Uno o più parametri invalidi 
 */
router.get("/getPlanes", planeController.getPlanes);
    
/**
 * @route POST /api/planes/newPlane
 * @description Crea un nuovo aereo
 * @access role: 1
 * @model L'id del modello dell'aereo
 * @constructionyear L'anno di costruzione dell'aereo
 * @returns {200} {nplane: number} Il numero di aerei creati
 * @returns {400} {message: string} Dati mancanti
 * @returns {400} {message: string} Modello non trovato
 * @returns {400} {message: string} Dati non validi
 */ 
router.post("/newPlane", authenticateToken, authorizeRoles(1), planeController.newPlane);

module.exports = router;