const express = require("express");
const router = express.Router();
const flightModel = require('../controllers/flightController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require("../middlewares/roleMiddleware")

router.get("/getFlight", flightModel.getFlights);

router.post("/newFlight", authenticateToken, authorizeRoles(1), flightModel.newFlight);

module.exports = router;