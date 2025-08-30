const express = require("express");
const router = express.Router();
const modelController = require('../controllers/modelController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require("../middlewares/roleMiddleware")

router.post("/newModel", authenticateToken, authorizeRoles(0, 1), modelController.newModel);

module.exports = router;