const express = require("express");
const router = express.Router();
const userController= require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get("/getUsers", authenticateToken, userController.getUsers);
router.post("/newUser", userController.newUser);

router.post("/login", userController.login);

module.exports = router;
