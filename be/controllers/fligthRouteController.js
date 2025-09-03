const flightRouteService = require("../services/flightRouteService");
const airportService = require("../services/airportService");

exports.getFlightRoutes = async (req, res, next) => {
    try {
        const { id, departure, arrival, airline } = req.query ?? {};
        const routes = await flightRouteService.getFlightRoutes(id, departure, arrival, airline);
        res.json(routes);
    } catch (err) {
        next(err);
    }
}

exports.newFlightRoute = async (req, res, next) => {
    try {
        const { departure, arrival } = req.body ?? {};
        const airline = req.id;
        if (!departure || !arrival || !airline) res.status(400).json({ message: "Required data missing" });
        else if (departure == arrival) res.status(400).json({ message: "Departure and destination airports cannot be the same" });
        else {
            const departureairport = await airportService.getAirports(departure, undefined, undefined, undefined);
            const arrivalairport = await airportService.getAirports(arrival, undefined, undefined, undefined);
            if (departureairport[0] && arrivalairport[0]) {
                const nflightroute = await flightRouteService.newFlightRoute(departure, arrival, airline);
                res.json({ nflightroute: nflightroute });
            } else res.status(400).json({ message: "Departure or destination airport not found" });
        }
    } catch (err) {
        if (err.code == '23505' && err.constraint == 'Rotte_Partenza_Destinazione_CompagniaAerea_key') res.status(409).json({ message: "Flight route already exists" });
        else next(err);
    }
}

//da completare con controllo voli attivi?
exports.updateFlightRoute = async (req, res, next) => {
    try {
        const { id, dep, arr } = req.body ?? {};
        const airline = req.id;
        if (!id) res.status(400).json({ message: "Required data missing" });
        else {
            const flightRoute = await flightRouteService.getFlightRoutes(id, undefined, undefined, undefined);
            const departure = dep || flightRoute.IdPartenza;
            const arrival = arr || flightRoute.IdArrivo;
            if (flightRoute.IdCompagniaAerea != airline) res.status(403).json({ message: "The route does not belong to the airline" });
            else if (departure == arrival) res.status(400).json({ message: "Departure and destination airports cannot be the same" });
            else {
                const departureairport = await airportService.getAirports(departure, undefined, undefined, undefined);
                const arrivalairport = await airportService.getAirports(arrival, undefined, undefined, undefined);
                if (departureairport[0] && arrivalairport[0]) {
                    const nflightroute = await flightRouteService.updateFlightRoute(id, departure, arrival, airline);
                    res.json({ nflightroute: nflightroute });
                } else res.status(400).json({ message: "Departure or destination airport not found" });
            }
        }
    } catch (err) {
        if (err.code == '23505' && err.constraint == 'Rotte_Partenza_Destinazione_CompagniaAerea_key') res.status(409).json({ message: "Flight route already exists" });
        next(err);
    }
}

exports.deleteFlightRoute = async (req, res, next) => {
    try {

    } catch (err) {

    }
}