const express = require("express");
const router = express.Router();

const userRoutes = require("./users");
const planeRoutes = require("./planes")

router.use("/users", userRoutes)
router.use("/planes", planeRoutes)

module.exports = router;