const flightService = require("../services/flightService");

exports.getFlights = async (req, res, next) => {
    try {
        const { id } = req.body ?? {};
        const flights = await flightService.getFlights(id);
        res.json({flights});
    } catch (err) {
        next(err);
    }
}

exports.newFlight = async (req, res, next) => {
    try {
        const { plane, route, schdepdate, scharrdate, actdepdate, actarrdate, state, pcprize, bprize, eprize, bagprize, lrprize, scprize } = req.body ?? {};
        const nflight = await flightService.newFlight(plane, route, schdepdate, scharrdate, actdepdate, actarrdate, state, pcprize, bprize, eprize, bagprize, lrprize, scprize);
        res.json({ nflight: nflight });
    } catch (err) {
        next(err);
    }
}



