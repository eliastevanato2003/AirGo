const airportService = require("../services/airportService");
const flightRouteService = require("../services/flightRouteService");

exports.getAirports = async (req, res, next) => {
    try {
        const { id, city, country, identificationcode } = req.query ?? {};
        const airports = await airportService.getAirports(id, city, country, identificationcode);
        res.json(airports);
    } catch (err) {
        next(err);
    }
}

exports.newAirport = async (req, res, next) => {
    try {
        const { city, country, name, identificationcode } = req.body ?? {};
        if (!city || !country || !name || !identificationcode) res.status(400).json({ message: "Required data missing" });
        const nairport = await airportService.newAirport(city, country, name, identificationcode);
        res.json({ nairport: nairport });
    } catch (err) {
        if (err.code == '23505' && err.constraint == 'Aereoporti_CodiceIdentificativo_key') res.status(409).json({ message: "Identification code already in use" });
        else next(err);
    }
}

exports.updateAirport = async (req, res, next) => {
    try{
        const { id, city, country, name, identificationcode } = req.body ?? {};
        const airport = await airportService.getAirports(id, undefined, undefined, undefined);        
        const routes1 = await flightRouteService.getFlightRoutes(undefined, id, undefined, undefined);
        const routes2 = await flightRouteService.getFlightRoutes(undefined, undefined, id, undefined);
        if (airport.rowCount == 0) res.status(400).json({message: "Airport to update not found"});
        else if(airport.rowCount > 1) res.status(500).json({message: "Multiple airports found for the specified ID"});
        else if(routes1.rowCount + routes2.rowCount == 0) {
            const nairport = await airportService.updateAirport(id, city || airport[0].Citta, country || airport[0].Nazione, name || airport[0].Nome, identificationcode || airport[0].CodiceIdentificativo);
            return nairport.rowCount;
        } else res.status(409).json({message: "Airport is being used in one or more routes"});
    } catch (err) {
        next(err);
    }
}

exports.deleteAirport = async (req, res, next) => {
    try{
        const { id } = req.body ?? {};
        const routes1 = await flightRouteService.getFlightRoutes(undefined, id, undefined, undefined);
        const routes2 = await flightRouteService.getFlightRoutes(undefined, undefined, id, undefined);
        if(routes1.rowCount + routes2.rowCount == 0) {
            const nairport = await airportService.deleteAirport(id);
            return nairport.rowCount;
        } else res.status(409).json({message: "Airport is being used in one or more routes"});
    } catch (err) {
        next(err);
    }
}