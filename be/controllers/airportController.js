const airportService = require("../services/airportService");

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