const flightService = require("../services/flightService");
const planeService = require("../services/planeService");
const flightRoutesController = require("../services/flightRouteService");

exports.getFlights = async (req, res, next) => {
    try {
        const { id, departure, arrival, datedeparture, datearrival, order } = req.query ?? {};
        let maxdatedeparture, mindatedeparture, maxdatearrival, mindatearrival;
        if (datedeparture) {
            mindatedeparture = new Date(datedeparture);
            maxdatedeparture = new Date(datedeparture);
            maxdatedeparture.setDate((new Date(datedeparture)).getDate() + 1);
        }
        if (datearrival) {
            maxdatearrival = new Date(datearrival);
            mindatearrival = new Date(datearrival);
            maxdatearrival.setDate((new Date(datearrival)).getDate() + 1);
        }
        const flights = await flightService.getFlights(id, departure, arrival, mindatedeparture, maxdatedeparture, mindatearrival, maxdatearrival, order);
        res.json({flights});
    } catch (err) {
        if(err.code == '22007') res.status(400).json({message: "Invalid query data type"});
        else next(err);
    }
}

exports.newFlight = async (req, res, next) => {
    try {
        const { plane, route, schdepdate, scharrdate, state, pcprize, bprize, eprize, bagprize, lrprize, scprize } = req.body ?? {};
        const getplane = await planeService.getPlanes(plane, undefined, undefined, undefined);
        const getroute = await flightRoutesController.getFlightRoutes(route, undefined, undefined);
        if (getplane[0].IdCompagniaAerea != req.id) res.status(409).json({ message: "Aereo" });
        else if (getroute[0].IdCompagniaAerea != req.id) res.status(409).json({ message: "Rotta" });
        else {
            const nflight = await flightService.newFlight(plane, route, schdepdate, scharrdate, state, pcprize, bprize, eprize, bagprize, lrprize, scprize);
            res.json({ nflight: nflight });
        }
    } catch (err) {
        next(err);
    }
}



