const bcrypt = require("bcrypt");
const airlineModel = require("../models/airlineModel");

exports.getAirlines = async (id, name, surname, email) => await airlineModel.getAirlines(id, name, surname, email);

exports.getAirline = async (id) => {
    const airlines = await airlineModel.getAirlines(id, undefined, undefined, undefined);
    return airlines?.[0] ?? {};
}

exports.newAirline = async (name, identificationcode, email, password) => {
    const hashedpassword = await bcrypt.hash(password, 10);
    return await airlineModel.newAirline(name, identificationcode, email, hashedpassword);
}