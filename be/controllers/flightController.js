const flightService = require("../services/flightService");
const planeService = require("../services/planeService");
const flightRouteService = require("../services/flightRouteService");
const extraLegService = require("../services/extraLegService");

exports.getFlights = async (req, res, next) => {
    try {
        const { id, airline, departure, arrival, datedeparture, datearrival, order, plane } = req.query ?? {};
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
        const flights = await flightService.getFlights(id, airline, departure, arrival, mindatedeparture, maxdatedeparture, mindatearrival, maxdatearrival, order, plane);
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
        const flights = await flightService.getFlightStatus(id);
        const rows = await extraLegService.getExtraLegs(undefined, flights[0].IdModello, undefined);
        flights[0].RigheExtraLeg = rows;
        res.json(flights);
    } catch (err) {
        if (err.code == '22P02') res.status(400).json({ message: "Invalid query parameter" });
        else next(err);
    }
}

//se c'è tempo controllare utilizzo contemporaneo aerei
exports.newFlight = async (req, res, next) => {
    try {
        const { plane, route, schdepdate, scharrdate, pcprize, bprize, eprize, bagprize, lrprize, scprize } = req.body ?? {};
        if (plane == undefined || route == undefined || schdepdate == undefined || scharrdate == undefined || pcprize == undefined || bprize == undefined || eprize == undefined || bagprize == undefined || lrprize == undefined || scprize == undefined) res.status(400).json({ message: "Required data missing" });
        else {
            const getplane = await planeService.getPlanes(plane, undefined, undefined, undefined);
            const getroute = await flightRouteService.getFlightRoutes(route, undefined, undefined);
            if (getplane[0]?.IdCompagniaAerea != req.id) res.status(409).json({ message: "Plane not found" });
            else if (getroute[0]?.IdCompagniaAerea != req.id) res.status(409).json({ message: "Flight route not found" });
            else {
                const nflight = await flightService.newFlight(plane, route, schdepdate, scharrdate, pcprize, bprize, eprize, bagprize, lrprize, scprize);
                res.json({ nflight: nflight });
            }
        }
    } catch (err) {
        if (err.routine == 'DateTimeParseError') res.status(400).json({ message: "Invalid date" });
        else if (err.code == '22P02') res.status(400).json({ message: "Invalid data" });
        else next(err);
    }
}



