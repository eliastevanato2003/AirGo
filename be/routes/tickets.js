const express = require("express");
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require("../middlewares/roleMiddleware")

router.get("/getTickets", ticketController.getTickets);

router.post("/newTicket", authenticateToken, authorizeRoles(2), ticketController.newTicket);

module.exports = router;