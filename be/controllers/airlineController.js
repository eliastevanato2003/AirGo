const airlineService = require("../services/airlineService");

exports.getAirlines = async (req, res, next) => {
    try {
        const { id, name, identificationcode, email } = req.query    ?? {};
        const airlines = await airlineService.getAirlines(id, name, identificationcode, email);
        res.json(airlines);
    } catch (err) {
        next(err);
    }
};

exports.getAirline = async (req, res, next) => {
    try {
        const id = req.id;
        const airline = await airlineService.getAirline(id);
        res.json(airline);
    } catch (err) {
        next(err);
    }
}

exports.newAirline = async (req, res, next) => {
    try {
        const { name, identificationcode, email, password } = req.body ?? {};
        if (!name || !identificationcode || !email || !password) res.status(400).json({ message: "Required data missing" });
        const nairline = await airlineService.newAirline(name, identificationcode, email, password);
        res.json({ "nairlines": nairline });
    } catch (err) {
        if (err.code == '23505' && err.constraint == 'CompagnieAeree_CodiceIdentificativo_key') res.status(409).json({ message: "Identification code already in use" });
        else if (err.code = '23505' && err.constraint == 'CompagnieAeree_Email_key') res.status(409).json({ message: "Email already in use" })
        else next(err);
    }
}
