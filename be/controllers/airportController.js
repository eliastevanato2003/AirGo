const airportService = require("../services/airportService");

exports.getAirports = async (req, res, next) => {
    try {
        const { city, country, identificationcode } = req.query ?? {};
        const airports = await airportService.getAirports(city, country, identificationcode);
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
        if (err.code == '23505' && err.constraint == 'Aeroporti_CodiceIdentificativo_key') res.status(409).json({ message: "Identification code already in use" });
        else next(err);
    }
}

exports.updateAirport = async (req, res, next) => {
    try{
        const { id, city, country, name, identificationcode } = req.body ?? {};
        const airport = await airportService.getAirports(id, undefined, undefined, undefined);
        const routes = 
        if(airport.rowCount == 0) res.status(400).json({message: "Airport to update not found"});
        else if(airport.rowCount > 1) res.status(500).json({message: "Multiple airports found for the specified ID"});
        else {

        }
    } catch (err) {
        next(err);
    }
}