const express = require("express");
const router = express.Router();

const userRoutes = require("./users");
const airlineRoutes = require("./airlines");
const modelRoutes = require("./models");

router.use("/users", userRoutes);
router.use("/airlines", airlineRoutes);
router.use("/models");

module.exports = router;