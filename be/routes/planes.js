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
 * @inservice (Opzionale) Lo stato di servizio dell'aereo, di default a true
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

/**
 * @route POST /api/planes/newPlane
 * @description Cambia lo stato di servizio di un aereo
 * @access role: 1
 * @id L'id dell'aereo
 * @inservice Il nuovo stato di servizio
 * @returns {200} {nplane: number} Il numero di aerei aggiornati
 * @returns {400} {message: string} Dati mancanti
 * @returns {400} {message: string} Aereo non trovato
 * @returns {400} {message: string} Dati non validi
 * @returns {409} {message: string} Voli attivi utilizzanti l'aereo indicato
 * @returns {409} {message: string} Stato già aggiornato
 */ 
router.post("/changeService", authenticateToken, authorizeRoles(1), planeController.changeService);

/**
 * @route DELETE /api/planes/deletePlane
 * @description Elimina un aereo
 * @access role: 1
 * @id L'id dell'aereo
 * @returns {200} {nplane: number} Il numero di aerei eliminati
 * @returns {400} {message: string} Dati mancanti
 * @returns {400} {message: string} Aereo non trovato
 * @returns {400} {message: string} Dati non validi
 * @returns {409} {message: string} Voli attivi utilizzanti l'aereo indicato
 */ 
router.delete("/deletePlane", authenticateToken, authorizeRoles(1), planeController.deletePlane);

module.exports = router;