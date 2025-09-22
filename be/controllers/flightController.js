const flightService = require("../services/flightService");
const planeService = require("../services/planeService");
const flightRouteService = require("../services/flightRouteService");
const ticketService = require("../services/ticketService");

exports.getFlights = async (req, res, next) => {
    try {
        const { id, airline, departure, arrival, datedeparture, datearrival, order, plane } = req.query ?? {};
        let { status } = req.query ?? {};
        if (status == undefined) status = "Programmato";
        else if (status == "All") status = undefined;
        let { mindatearrival, maxdatearrival, mindatedeparture, maxdatedeparture } = req.query ?? {};
        if (datedeparture && (maxdatedeparture == undefined && mindatedeparture == undefined)) {
            mindatedeparture = new Date(datedeparture);
            maxdatedeparture = new Date(datedeparture);
            maxdatedeparture.setDate((new Date(datedeparture)).getDate() + 1);
            maxdatedeparture.setTime(maxdatedeparture.getTime() - 1);
        }
        if (datearrival && (maxdatearrival == undefined && mindatearrival == undefined)) {
            maxdatearrival = new Date(datearrival);
            mindatearrival = new Date(datearrival);
            maxdatearrival.setDate((new Date(datearrival)).getDate() + 1);
            maxdatearrival.setTime(maxdatearrival.getTime() - 1);
        }
        const flights = await flightService.getFlights(id, airline, departure, arrival, mindatedeparture, maxdatedeparture, mindatearrival, maxdatearrival, order, plane, status);
        const flights2 = id == undefined ? await flightService.getFlightsJoin(airline, departure, arrival, mindatedeparture, maxdatedeparture, mindatearrival, maxdatearrival, order, plane, status) : {};
        for (let i = 0; i < flights.length; i++) {
            const status = await flightService.getFlightStatus(flights[i].IdVolo);
            if (status[0].PostiPc - status[0].PostiOccPc == 0 && status[0].PostiB - status[0].PostiOccB == 0 && status[0].PostiE - status[0].PostiOccE == 0) flights[i].Pieno = true;
            else flights[i].Pieno = false;
        }
        for (let i = 0; i < flights2.length; i++) {
            const status1 = await flightService.getFlightStatus(flights2[i].V1.IdVolo);
            if (status1[0].PostiPc - status1[0].PostiOccPc == 0 && status1[0].PostiB - status1[0].PostiOccB == 0 && status1[0].PostiE - status1[0].PostiOccE == 0) flights2[i].V1.Pieno = true;
            else flights2[i].V1.Pieno = false;
            const status2 = await flightService.getFlightStatus(flights2[i].V2.IdVolo);
            if (status2[0].PostiPc - status2[0].PostiOccPc == 0 && status2[0].PostiB - status2[0].PostiOccB == 0 && status2[0].PostiE - status2[0].PostiOccE == 0) flights2[i].V2.Pieno = true;
            else flights2[i].V2.Pieno = false;
            flights.push(flights2[i]);
        }
        res.json(flights);
    } catch (err) {
        if (err.routine == 'DateTimeParseError') res.status(400).json({ message: "Invalid date" });
        else if (err.code == '22P02') res.status(400).json({ message: "Invalid query parameter" });
        else next(err);
    }
}

exports.getFlightStatus = async (req, res, next) => {
    try {
        const { id } = req.query ?? {};
        if (id == undefined) res.status(400).json({ message: "Id required" });
        const flight = await flightService.getFlightStatus(id);
        res.json(flight);
    } catch (err) {
        if (err.code == '22P02') res.status(400).json({ message: "Invalid query parameter" });
        else next(err);
    }
}

exports.newFlight = async (req, res, next) => {
    try {
        const { plane, route, pcprice, bprice, eprice, bagprice, lrprice, scprice } = req.body ?? {};
        let { scharrdate, schdepdate } = req.body ?? {};
        if (plane == undefined || route == undefined || schdepdate == undefined || scharrdate == undefined || pcprice == undefined || bprice == undefined || eprice == undefined || bagprice == undefined || lrprice == undefined || scprice == undefined) res.status(400).json({ message: "Required data missing" });
        else {
            scharrdate = new Date(scharrdate);
            schdepdate = new Date(schdepdate);
            if (scharrdate <= schdepdate) {
                res.status(409).json({ message: "Arrival date cannot be before departure date" });
                return;
            }
            if (schdepdate < new Date() || scharrdate < new Date()) {
                res.status(409).json({ message: "Arrival or departure date cannot be in the past" });
                return;
            }
            if (pcprice < 0 || bprice < 0 || eprice < 0 || bagprice < 0 || lrprice < 0 || scprice < 0) {
                res.status(400).json({ message: "Prices cannot be less than 0" });
                return;
            }
            const getplane = await planeService.getPlanes(plane, undefined, undefined, undefined, undefined);
            const getroute = await flightRouteService.getFlightRoutes(route, undefined, undefined);
            if (getplane[0]?.IdCompagniaAerea != req.id) res.status(409).json({ message: "Plane not found" });
            else if (getroute[0]?.IdCompagniaAerea != req.id) res.status(409).json({ message: "Flight route not found" });
            else {
                const nflight = await flightService.newFlight(plane, route, schdepdate, scharrdate, pcprice, bprice, eprice, bagprice, lrprice, scprice);
                res.json({ nflight: nflight });
            }
        }
    } catch (err) {
        if (err.routine == 'DateTimeParseError') res.status(400).json({ message: "Invalid date" });
        else if (err.code == '22P02') res.status(400).json({ message: "Invalid data" });
        else next(err);
    }
}

exports.departure = async (req, res, next) => {
    try {
        const { id } = req.body ?? {};
        if (id == undefined) res.status(400).json({ message: "Id missing" });
        else {
            const flight = await flightService.getFlights(id, req.id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "Programmato");
            if (flight[0]) {
                const nflight = await flightService.updateFlight(id, new Date(), undefined, "Decollato", flight[0].CostoPC, flight[0].CostoB, flight[0].CostoE);
                res.json({ nflight: nflight });
            } else res.status(400).json({ message: "Flight not found" });
        }
    } catch (err) {
        if (err.code == '22P02') res.status(400).json({ message: "Invalid data" });
        else next(err);
    }
}

exports.arrival = async (req, res, next) => {
    try {
        const { id } = req.body ?? {};
        if (id == undefined) res.status(400).json({ message: "Id missing" });
        else {
            const flight = await flightService.getFlights(id, req.id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "Decollato");
            if (flight[0]) {
                const nflight = await flightService.updateFlight(id, flight[0].DataPartenzaEff, new Date(), "Atterrato", flight[0].CostoPC, flight[0].CostoB, flight[0].CostoE);
                res.json({ nflight: nflight });
            } else res.status(400).json({ message: "Flight not found" });
        }
    } catch (err) {
        if (err.code == '22P02') res.status(400).json({ message: "Invalid data" });
        else next(err);
    }
}

exports.updateEffDate = async (req, res, next) => {
    try {
        const { id } = req.body ?? {};
        let { effdepdate, effarrdate } = req.body ?? {};
        if (id == undefined) res.status(400).json({ message: "Id missing" });
        else {
            const flight = await flightService.getFlights(id, req.id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
            if (flight[0]) {
                if (flight[0].Stato != 'Atterrato' && flight[0].Stato != 'Cancellato') {
                    res.status(409).json({ message: "Scheduled or departed flight" });
                    return;
                }
                effdepdate = effdepdate != undefined ? new Date(effdepdate) : flight[0].DataPartenzaEff;
                effarrdate = effarrdate != undefined ? new Date(effarrdate) : flight[0].DataArrivoEff;
                if (effdepdate >= effarrdate) {
                    res.status(409).json({ message: "Arrival date cannot be before departure date" });
                    return;
                }
                if (effdepdate > new Date() || effarrdate > new Date()) {
                    res.status(409).json({ message: "Arrival or departure date cannot be in the future" });
                    return;
                }
                const nflight = await flightService.updateFlight(id, effdepdate, effarrdate, flight[0].Stato, flight[0].CostoPC, flight[0].CostoB, flight[0].CostoE);
                res.json({ nflight: nflight });
            } else res.status(400).json({ message: "Flight not found" });
        }
    } catch (err) {
        if (err.routine == 'DateTimeParseError') res.status(400).json({ message: "Invalid date" });
        else if (err.code == '22P02') res.status(400).json({ message: "Invalid data" });
        else next(err);
    }
}

exports.updatePrices = async (req, res, next) => {
    try {
        const { id } = req.body ?? {};
        let { pcprice, bprice, eprice } = req.body ?? {};
        if (id == undefined) res.status(400).json({ message: "Id missing" });
        else {
            const flight = await flightService.getFlights(id, req.id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "Programmato");
            if (flight[0]) {
                if (pcprice < 0 || bprice < 0 || eprice < 0) {
                    res.status(409).json({ message: "Prices cannot be less than 0" });
                    return;
                }
                const nflight = await flightService.updateFlight(id, flight[0].DataPartenzaEff, flight[0].DataArrivvoEff, flight[0].Stato, pcprice || flight[0].CostoPC, bprice || flight[0].CostoB, eprice || flight[0].CostoE);
                res.json({ nflight: nflight });
            } else res.status(400).json({ message: "Flight not found" });
        }
    } catch (err) {
        if (err.code == '22P02') res.status(400).json({ message: "Invalid data" });
        else next(err);
    }
}

exports.assignSeats = async (req, res, next) => {
    try {
        const { id } = req.body ?? {};
        const flightstatus = await flightService.getFlightStatus(id);
        const flight = await flightService.getFlights(id, req.id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
        const ticketse = await ticketService.getTickets(req.id, undefined, undefined, id, undefined, undefined, "Economy");
        const seate = ticketse
            .filter(obj => obj.RigPosto != undefined && obj.ColPosto != undefined)
            .map(obj => `${obj.RigPosto}${obj.ColPosto}`);
        const ticketsb = await ticketService.getTickets(req.id, undefined, undefined, id, undefined, undefined, "Business");
        const seatb = ticketsb
            .filter(obj => obj.RigPosto != undefined && obj.ColPosto != undefined)
            .map(obj => `${obj.RigPosto}${obj.ColPosto}`);
        const ticketspc = await ticketService.getTickets(req.id, undefined, undefined, id, undefined, undefined, "Prima");
        const seatpc = ticketspc
            .filter(obj => obj.NPosto != undefined)
            .map(obj => obj.NPosto);
        if (flightstatus[0] && flight[0] && flight[0]?.IdVolo == flightstatus[0]?.IdVolo) {
            let frseatsb = seats(flightstatus[0].RigheB, flightstatus[0].ColonneB);
            let frseatse = seats(flightstatus[0].RigheE, flightstatus[0].ColonneE);
            let frseatspc = Array.from({ length: flightstatus[0].PostiPc }, (_, i) => i + 1);

            frseatspc = frseatspc.filter(x => !seatpc.includes(x));
            frseatsb = frseatsb.filter(x => !seatb.includes(x));
            frseatse = frseatse.filter(x => !seate.includes(x));

            let s = 0;
            for (let ticket of ticketse) {
                if (ticket.ColPosto == undefined && ticket.RigPosto == undefined) {
                    const seat = frseatse.pop();
                    const col = seat.at(-1);
                    const row = seat.slice(0, -1);
                    s += await ticketService.updateTicket(ticket.IdBiglietto, ticket.Nome, ticket.Cognome, ticket.DoB, ticket.NBagagliExtra, row, col, undefined, ticket.Costo);
                }
            }
            for (let ticket of ticketsb) {
                if (ticket.ColPosto == undefined && ticket.RigPosto == undefined) {
                    const seat = frseatsb.pop();
                    const col = seat.at(-1);
                    const row = seat.slice(0, -1);
                    s += await ticketService.updateTicket(ticket.IdBiglietto, ticket.Nome, ticket.Cognome, ticket.DoB, ticket.NBagagliExtra, row, col, undefined, ticket.Costo);
                }
            }
            for (let ticket of ticketspc) {
                if (ticket.NPosto == undefined) {
                    const seat = frseatspc.pop();
                    s += await ticketService.updateTicket(ticket.IdBiglietto, ticket.Nome, ticket.Cognome, ticket.DoB, ticket.NBagagliExtra, undefined, undefined, seat, ticket.Costo);
                }
            }
            res.json(s);
        } else res.status(400).json({ message: "Flight not found" });
    } catch (err) {
        if (err.code == '22P02') res.status(400).json({ message: "Invalid data" });
        else next(err);
    }
}

exports.deleteFlight = async (req, res, next) => {
    try {
        const { id } = req.body ?? {};
        if (id == undefined) {
            res.status(400).json({ message: "Id missing" });
            return;
        }
        const flight = await flightService.getFlights(id, req.id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
        const flightstatus = await flightService.getFlightStatus(id);
        if (flightstatus[0] && flight[0] && flight[0]?.IdCompagniaAerea == req.id) {
            if (flightstatus[0].PostiOccupati > 0) {
                res.status(409).json({ message: "Tickets purchased for this flight" });
                return;
            }
            const nflight = await flightService.deleteFlight(id);
            res.json({ nflight: nflight });
        } else res.status(400).json({ message: "Flight not found" });
    } catch (err) {
        if (err.code == '22P02') res.status(400).json({ message: "Invalid data" });
        else next(err);
    }
}

exports.cancelFlight = async (req, res, next) => {
    try {
        const { id } = req.body ?? {};
        if(id == undefined){
            res.status(400).json({message: "Id missing"});
            return;
        }
        const flight = await flightService.getFlights(id, req.id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "Programmato");
        if (flight[0]) {
            const nflight = await flightService.updateFlight(id, flight[0].DataPartenzaEff, flight[0].DataArrivvoEff, "Cancellato", flight[0].CostoPC, flight[0].CostoB, flight[0].CostoE);
            res.json({ nflight: nflight });
        } else res.status(400).json({ message: "Flight not found" });
    } catch (err) {
        if (err.code == '22P02') res.status(400).json({ message: "Invalid data" });
        else next(err);
    }
}

function seats(row, col) {
    let arr = [];
    for (let i = 1; i <= row; i++) {
        for (let j = 0; j < col; j++) {
            arr.push(String(i) + String.fromCharCode(65 + j));
        }
    }
    return arr;
}



