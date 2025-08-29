const userService = require("../services/airlineService");

exports.getAirlines = async (req, res, next) => {
    try {
        const { name, identificationcode, email } = req.body ?? {};
        const airlines = await userService.getAirlines(name, identificationcode, email);
        res.json(airlines);
    } catch (err) {
        next(err);
    }
};

exports.newAirline = async (req, res, next) => {
    try {
        const { name, identificationcode, email, password } = req.body ?? {};
        const nairline = await userService.newAirline(name, identificationcode, email, password);
        res.json({"nutenti" : nairline});
    } catch (err) {
        next(err);
    }
}
