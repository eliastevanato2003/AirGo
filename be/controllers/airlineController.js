const airlineService = require("../services/airlineService");
const emailService = require("../services/emailService");

exports.getAirlines = async (req, res, next) => {
    try {
        const { id, name, identificationcode, email } = req.query ?? {};
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
        else {
            const mail = await emailService.newEmail(email);
            if (mail[0]) {
                const nairline = await airlineService.newAirline(name, identificationcode, mail[0].IdEmail, password);
                res.json({ nairline: nairline });
            } else res.status(500).json({ message: "Error during email insertion" });
        }
    } catch (err) {
        if (err.code == '23505' && err.constraint == 'IndirizziEmail_Email_key') res.status(409).json({ message: "Email already in use" });
        else {
            await emailService.deleteEmail(req.body.email);
            if (err.code == '23505' && err.constraint == 'CompagnieAeree_CodiceIdentificativo_key') res.status(409).json({ message: "Identification code already in use" });
            else next(err);
        }
    }
}

exports.updateAirline = async (req, res, next) => {
    try {
        const { name, identificationcode, email, password } = req.body ?? {};
        const airline = await airlineService.getAirline(req.id);
        console.log(airline);
        if (airline.IdCompagniaAerea) {
            if (email) await emailService.updateEmail(airline.Mail, email);
            const nairline = await airlineService.updateAirline(req.id, name || airline.Nome, identificationcode || airline.CodiceIdentificativo, password);
            res.json({ nairline: nairline });
        } else res.status(500).json({message: "Airline not found"});
    } catch (err) {
        if (err.code == '23505' && err.constraint == 'CompagnieAeree_CodiceIdentificativo_key') res.status(409).json({ message: "Identification code already in use" });
        else if (err.code == '23505' && err.constraint == 'IndirizziEmail_Email_key') res.status(409).json({ message: "Email already in use" })
        else next(err);
    }
}

exports.deleteAirline = async (req, res, next) => {
    try {
        const nairline = await airlineService.deleteAirline(req.id);
        if (nairline >= 1) await emailService.deactivateEmail(req.email);
        res.json({ nairline: nairline });
    } catch (err) {
        next(err);
    }
}
