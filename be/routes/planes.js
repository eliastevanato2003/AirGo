const express = require("express");
const router = express.Router();
const planeController = require('../controllers/planeController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require("../middlewares/roleMiddleware")

//Mancano controlli sui dati ed errori
router.post("/newPlane", authenticateToken, authorizeRoles(1), planeController.newPlane);

module.exports = router;