const express = require("express");
const router = express.Router();

const userRoutes = require("./users");
const airlineRoutes = require("./airlines");
const modelRoutes = require("./models");
const planeRoutes = require("./planes");
const airportRoutes = require("./airports");

router.use("/users", userRoutes);
router.use("/airlines", airlineRoutes);
router.use("/models", modelRoutes);
router.use("/planes", planeRoutes);
router.use("/airports", airportRoutes);

module.exports = router;