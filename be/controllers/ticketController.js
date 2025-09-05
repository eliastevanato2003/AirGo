const ticketService = require("../services/ticketService")

exports.getTickets = async (req, res, next) => {
    try {
        const { id, user, flight } = req.query ?? {};
        const tickets = await ticketService.getTickets(id, user, flight);
        res.json({ tickets });
    } catch (err) {
        next(err);
    }
}

exports.newTicket = async (req, res, next) => {
    try {
        const { user, flight, name, surname, dob, clas, nextrabag, row, col } = req.body ?? {};
        const nticket = await ticketService.newTicket(user, flight, name, surname, dob, clas, nextrabag, row, col);
        res.json({ nticket: nticket });
    } catch (err) {
        next(err);
    }
}