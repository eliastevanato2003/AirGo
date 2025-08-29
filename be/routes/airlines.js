const express = require("express");
const router = express.Router();
const airlineController = require('../controllers/airlineController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get("/getAirlines", authenticateToken, airlineController.getAirlines);
router.post("/newAirline", airlineController.newAirline);

module.exports = router;