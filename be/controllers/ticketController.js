const ticketService = require("../services/ticketService");
const flightService = require("../services/flightService");

exports.getTickets = async (req, res, next) => {
    try {
        const { id, flight, row, col, clas } = req.query ?? {};
        let { user, airline } = req.query ?? {};
        if (req.role == 2) user = req.id;
        else if (req.role == 1) airline = req.id;
        const tickets = await ticketService.getTickets(airline, id, user, flight, row, col, clas);
        res.json({ tickets });
    } catch (err) {
        if (err.code == '22P02') res.status(400).json({ message: "Invalid data" });
        else next(err);
    }
}

exports.newTicket = async (req, res, next) => {
    try {
        const { flight, name, surname, dob, clas, nextrabag, chseat, price } = req.body ?? {};
        let { row, col } = req.body ?? {};
        if (flight == undefined || name == undefined || surname == undefined || dob == undefined || clas == undefined || nextrabag == undefined || chseat == undefined || price == undefined) res.status(400).json({ message: "Missing required data" });
        else if (chseat == true && (row == undefined || col == undefined)) res.status(400).json({ message: "Missing choosen seat" });
        else if (!["Prima", "Business", "Economy"].includes(clas)) res.status(400).json({ message: "Invalid class" });
        else {
            const flights = await flightService.getFlights(flight, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "Programmato");
            if (flights[0]) {
                const flightstatus = await flightService.getFlightStatus(flight);
                if (chseat == false) row = col = undefined;
                else {
                    if (row < 1 || col.length !== 1 || !col.toUpperCase().match(/[A-Z]/)) {
                        res.status(400).json({ message: "Invalid seat" });
                        return;
                    }
                    const seat = await ticketService.getTickets(undefined, undefined, flight, row, col, clas);
                    if (seat[0]) {
                        res.status(409).json({ message: "Seat not available" });
                        return;
                    }
                }
                const user = req.id;
                let pr, seat = false;
                if (clas == "Prima" && flightstatus?.[0].PostiPc - flightstatus?.[0].PostiOccPc > 0) {
                    pr = flights[0].CostoPC + flights[0].CostoBag * nextrabag;
                    seat = true;
                } else if (clas == "Business" && flightstatus?.[0].PostiB - flightstatus?.[0].PostiOccB > 0) {
                    pr = flights[0].CostoB + flights[0].CostoBag * nextrabag + chseat * flights[0].CostoSceltaPosto;
                    if (chseat) {
                        if (row > flightstatus[0].RigheB || (col.toUpperCase().charCodeAt(0) - 64 > flightstatus[0].ColonneB)) {
                            res.status(400).json({ message: "Invalid seat" });
                            return;
                        }
                    }
                    seat = true;
                } else if (clas == "Economy" && flightstatus?.[0].PostiE - flightstatus?.[0].PostiOccE > 0) {
                    pr = flights[0].CostoE + flights[0].CostoBag * nextrabag + chseat * flights[0].CostoSceltaPosto;
                    if (chseat) {
                        if (row > flightstatus[0].RigheE || (col.toUpperCase().charCodeAt(0) - 64 > flightstatus[0].ColonneE)) {
                            res.status(400).json({ message: "Invalid seat" });
                            return;
                        }
                        const righextra = flightstatus[0].RigheExtraLeg.map(riga => riga.NRiga);
                        if (righextra.includes(row)) pr += flights[0].CostoLegRoom;
                    }
                    seat = true;
                }
                if (seat) {
                    if (pr == price) {
                        const nticket = await ticketService.newTicket(user, flight, name, surname, dob, clas, nextrabag, row, col, undefined, chseat, price);
                        res.json({ nticket: nticket });
                    } else res.status(400).json({ message: "Price incorrect" });
                } else res.status(409).json({ message: "No seat available" });
            } else res.status(400).json({ message: "Flight not found" });
        }
    } catch (err) {
        if (err.code == '22P02') res.status(400).json({ message: "Invalid data" });
        else if (err.routine == 'DateTimeParseError') res.status(400).json({ message: "Invalid date" });
        else next(err);
    }
}