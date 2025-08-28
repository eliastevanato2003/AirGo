const express = require("express");
const router = express.Router();
const userControllers= require('../controllers/userControllers')

router.get("/prova", userControllers.prova);

module.exports = router;
