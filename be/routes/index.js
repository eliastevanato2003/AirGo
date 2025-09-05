const express = require("express");
const router = express.Router();

const userRoutes = require("./users");
const airlineRoutes = require("./airlines");
const modelRoutes = require("./models");
const planeRoutes = require("./planes");
const airportRoutes = require("./airports");
const flightRouteRoutes = require("./flightRoutes");
const flightRoutes = require("./flights");
const ticketRoutes = require("./tickets");

router.use("/users", userRoutes);
router.use("/airlines", airlineRoutes);
router.use("/models", modelRoutes);
router.use("/planes", planeRoutes);
router.use("/airports", airportRoutes);
router.use("/flightRoutes", flightRouteRoutes);
router.use("/flights", flightRoutes);
router.use("/tickets", ticketRoutes);

module.exports = router;