const express = require("express");
const router = express.Router();
const flightRoutesController = require('../controllers/fligthRouteController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require("../middlewares/roleMiddleware")

//Mancano errori e controllo dati
router.post("/newFlightRoute", authenticateToken, authorizeRoles(1), flightRoutesController.newFlightRoute);

module.exports = router;

