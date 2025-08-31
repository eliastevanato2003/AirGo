const flightRouteService = require("../services/flightRouteService");

exports.newFlightRoute = async (req, res, next) => {
    try {
        const { departure, arrival, airline } = req.body ?? {};
        const nflightroute = await flightRouteService.newFlightRoute(departure, arrival, airline);
        res.json({nflightroute: nflightroute});
    } catch (err) {
        next(err);
    }

}