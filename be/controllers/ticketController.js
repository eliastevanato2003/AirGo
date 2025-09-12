const ticketService = require("../services/ticketService");
const flightService = require("../services/flightService");

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
        const { flight, name, surname, dob, clas, nextrabag, row, col, nseat, chseat } = req.body ?? {};
        if (flight == undefined || name == undefined || surname == undefined || dob == undefined || clas == undefined || chseat == undefined) res.status(400).json({ message: "Missing required data" });
        else if (chseat == true && (row == undefined || col == undefined) && nseat == undefined) res.status(400).json({ message: "Missing choosen seat" });
        else if (!clas in ["Prima", "Business", "Economy"]) res.status(400).json({ message: "Invalid class" });
        else {
            const flights = await flightService.getFlights(flight, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
            if (flights[0]) {
                const flightstatus = await flightService.getFlightStatus(flight);
                //const plane = await 
                if (clas == "Prima" && flightstatus?.[0].PostiPc - flightstatus?.[0].PostiOccPc > 0
                    || clas == "Business" && flightstatus?.[0].PostiB - flightstatus?.[0].PostiOccB > 0
                    || clas == "Economy" && flightstatus?.[0].PostiE - flightstatus?.[0].PostiOccE > 0) {
                    if (chseat == false) nseat = row = col = undefined;
                    const user = req.id;
                    const nticket = await ticketService.newTicket(user, flight, name, surname, dob, clas, nextrabag, row, col, nseat, chseat, price);
                    res.json({ nticket: nticket });
                } else res.status(409).json({message: "No seat available"});
            } else res.status(400).json({ message: "Flight not found" });
        }
    } catch (err) {
        next(err);
    }
}