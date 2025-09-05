const flightService = require("../services/flightService");
const planeService = require("../services/planeService");
const flightRoutesController = require("../services/flightRouteService");

exports.getFlights = async (req, res, next) => {
    try {
        const { id, departure, arrival } = req.query ?? {};
        const flights = await flightService.getFlights(id, departure, arrival);
        res.json({flights});
    } catch (err) {
        next(err);
    }
}

exports.newFlight = async (req, res, next) => {
    try {
        const { plane, route, schdepdate, scharrdate, actdepdate, actarrdate, state, pcprize, bprize, eprize, bagprize, lrprize, scprize } = req.body ?? {};
        const getplane = await planeService.getPlanes(plane, undefined, undefined, undefined);
        const getroute = await flightRoutesController.getFlightRoutes(route, undefined, undefined);
        if (getplane[0].IdCompagniaAerea != req.id) res.status(409).json({ message: "Aereo" });
        else if (getroute[0].IdCompagniaAerea != req.id) res.status(409).json({ message: "Rotta" });
        else {
            const nflight = await flightService.newFlight(plane, route, schdepdate, scharrdate, actdepdate, actarrdate, state, pcprize, bprize, eprize, bagprize, lrprize, scprize);
            res.json({ nflight: nflight });
        }
    } catch (err) {
        next(err);
    }
}



