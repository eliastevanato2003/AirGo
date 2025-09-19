const flightRouteService = require("../services/flightRouteService");
const airportService = require("../services/airportService");
const flightService = require("../services/flightService");

exports.getFlightRoutes = async (req, res, next) => {
    try {
        const { id, departure, arrival } = req.query ?? {};
        const routes = await flightRouteService.getFlightRoutes(id, departure, arrival, req.id);
        res.json(routes);
    } catch (err) {
        if (err.code == '22P02') res.status(400).json({ message: "Invalid query parameter" });
        else next(err);
    }
}

exports.newFlightRoute = async (req, res, next) => {
    try {
        const { departure, arrival } = req.body ?? {};
        const airline = req.id;
        if (departure == undefined || arrival == undefined) res.status(400).json({ message: "Required data missing" });
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
        else if (err.code == '22P02') res.status(400).json({ message: "Invalid data" });
        else next(err);
    }
}

exports.updateFlightRoute = async (req, res, next) => {
    try {
        const { id, dep, arr } = req.body ?? {};
        if (dep == undefined && arr == undefined) res.json({ nflightroute: 0 });
        else if (!id) res.status(400).json({ message: "Id missing" });
        else {
            const flightRoute = await flightRouteService.getFlightRoutes(id, undefined, undefined, req.id);
            if (!flightRoute[0]) {
                res.status(409).json({ message: "Route not found" });
                return;
            }
            const departure = dep || flightRoute[0].IdPartenza;
            const arrival = arr || flightRoute[0].IdDestinazione;
            if (departure == arrival) res.status(400).json({ message: "Departure and destination airports cannot be the same" });
            else {
                const departureairport = await airportService.getAirports(departure, undefined, undefined, undefined);
                const arrivalairport = await airportService.getAirports(arrival, undefined, undefined, undefined);
                if (departureairport[0] && arrivalairport[0]) {
                    const flights = await flightService.getFlights(undefined, req.id, flightRoute[0].IdPartenza, flightRoute[0].IdDestinazione, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
                    if (flights[0]) res.status(409).json({ message: "Flights active using this route" });
                    else res.json({ nflightroute: await flightRouteService.updateFlightRoute(id, departure, arrival) });
                } else res.status(400).json({ message: "Departure or destination airport not found" });
            }
        }
    } catch (err) {
        if (err.code == '23505' && err.constraint == 'Rotte_Partenza_Destinazione_CompagniaAerea_key') res.status(409).json({ message: "Flight route already exists" });
        else next(err);
    }
}

exports.deleteFlightRoute = async (req, res, next) => {
    try {
        const { id } = req.body ?? {};
        if (id == undefined) res.status(400).json({ message: "Id missing" });
        else {
            const flightRoute = await flightRouteService.getFlightRoutes(id, undefined, undefined, req.id);
            if(!flightRoute[0]) {
                res.json({nflightroute: 0});
                return;
            }
            const flights = await flightService.getFlights(undefined, req.id, flightRoute[0].IdPartenza, flightRoute[0].IdDestinazione, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
            if (!flights[0]) res.json({ nflightroute: await flightRouteService.deleteFlightRoute(id, req.id) });
            else res.status(409).json({ message: "Flights active using this route" });
        }
    } catch (err) {
        if (err.code == '22P02') res.status(400).json({ message: "Invalid data" });
        else next(err);
    }
}