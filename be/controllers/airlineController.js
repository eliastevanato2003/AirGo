const airlineService = require("../services/airlineService");
const emailService = require("../services/emailService");
const mailing = require("../middlewares/mail")
const flightService = require("../services/flightService");
const flightRouteService = require("../services/flightRouteService");

exports.getAirlines = async (req, res, next) => {
    try {
        const { id, name, identificationcode, email } = req.query ?? {};
        const airlines = await airlineService.getAirlines(id, name, identificationcode, email);
        res.json(airlines);
    } catch (err) {
        if (err.code == '22P02') res.status(400).json({ message: "Invalid query parameter" });
        else next(err);
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
        const { name, identificationcode, email } = req.body ?? {};
        if (!name || !identificationcode || !email) res.status(400).json({ message: "Required data missing" });
        else {
            const mail = await emailService.newEmail(email);
            if (mail[0]) {
                const num = Math.floor(Math.random() * 1000000);
                const str = num.toString().padStart(6, "0");
                const nairline = await airlineService.newAirline(name, identificationcode, mail[0].IdEmail, str);
                const url = `http://localhost:4000/password?email=${encodeURIComponent(email)}&temp=${encodeURIComponent(str)}`;
                mailing.sendMail(email, name, url);
                res.json({ nairline: nairline });
            } else res.status(500).json({ message: "Error during email insertion" });
        }
    } catch (err) {
        if (err.code == '22P02') res.status(400).json({ message: "Invalid data" });
        else if (err.code == '23505' && err.constraint == 'IndirizziEmail_Email_key') res.status(409).json({ message: "Email already in use" });
        else {
            await emailService.deleteEmail(req.body.email);
            if (err.code == '23505' && err.constraint == 'CompagnieAeree_CodiceIdentificativo_key') res.status(409).json({ message: "Identification code already in use" });
            else next(err);
        }
    }
}

exports.activateAirline = async (req, res, next) => {
    try {
        const { email, pw1, pw2, temp } = req.body ?? {};
        if (email == undefined || pw1 == undefined || pw2 == undefined || temp == undefined) res.status(400).json({ message: "Required data missing" });
        else if (pw1 != pw2) res.status(400).json({ message: "Passwords not equals" });
        else {
            const nairline = await airlineService.activateAirline(email, pw1, temp);
            res.json({ nairline: nairline });
        }
    } catch (err) {
        if (err.code == '22P02') res.status(400).json({ message: "Invalid data" });
        else next(err);
    }
}

exports.updateAirline = async (req, res, next) => {
    try {
        const { name, identificationcode, email, password } = req.body ?? {};
        const airline = await airlineService.getAirline(req.id);
        if (airline.IdCompagniaAerea) {
            if (email) await emailService.updateEmail(airline.Mail, email);
            const nairline = await airlineService.updateAirline(req.id, name || airline.Nome, identificationcode || airline.CodiceIdentificativo, password);
            res.json({ nairline: nairline });
        } else res.status(500).json({ message: "Airline not found" });
    } catch (err) {
        if (err.code == '22P02') res.status(400).json({ message: "Invalid data" });
        else if (err.code == '23505' && err.constraint == 'CompagnieAeree_CodiceIdentificativo_key') res.status(409).json({ message: "Identification code already in use" });
        else if (err.code == '23505' && err.constraint == 'IndirizziEmail_Email_key') res.status(409).json({ message: "Email already in use" })
        else next(err);
    }
}

exports.deleteAirline = async (req, res, next) => {
    try {
        const { id } = req.body ?? {};
        const airline = await airlineService.getAirline(id);
        const flights1 = await flightService.getFlights(undefined, id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "Programmato");
        const flights2 = await flightService.getFlights(undefined, id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "Decollato");
        if (airline) {
            if (flights1[0] || flights2[0]) res.status(409).json({ message: "Flights active" });
            else {
                const nairline = await emailService.deactivateEmail(airline.IdEmail);
                res.json({ nairline: nairline });
            }
        } else res.status(400).json({ message: "Airline not found" });
    } catch (err) {
        if (err.code == '22P02') res.status(400).json({ message: "Invalid data" });
        else next(err);
    }
}

exports.getStatsRoute = async (req, res, next) => {
    try {
        let { order } = req.query ?? {};
        if (order != 1 || order != 2) order = 1;
        const stats = await airlineService.getStatsRoute(req.id, order);
        res.json(stats);
    } catch (err) {
        if (err.code == '22P02') res.status(400).json({ message: "Invalid data" });
        else next(err);
    }
}

exports.getStatsFlight = async (req, res, next) => {
    try {
        const { route } = req.query ?? {};
        const routes = await flightRouteService.getFlightRoutes(route, undefined, undefined, undefined);
        if (routes[0]) {
            const stats = await airlineService.getStatsFlight(req.id, route);
            res.json(stats);
        }
        else res.status(400).json({ message: "Route not found" });
    } catch (err) {
        if (err.code == '22P02') res.status(400).json({ message: "Invalid data" });
        else next(err);
    }
}
