const express = require("express");
const router = express.Router();

const userRoutes = require("./users");
const airlineRoutes = require("./airlines");

router.use("/users", userRoutes)
router.use("/airlines", airlineRoutes);

module.exports = router;