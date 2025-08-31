const express = require("express");
const router = express.Router();
const airportController = require('../controllers/airportController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require("../middlewares/roleMiddleware")

router.post("/newAirport", authenticateToken, authorizeRoles(0,1), airportController.newAirport);

module.exports = router;