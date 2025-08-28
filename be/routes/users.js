const express = require("express");
const router = express.Router();
const userController= require('../controllers/userController');

router.get("/getUsers", userController.getUsers);
router.post("/newUser", userController.newUser);

module.exports = router;
