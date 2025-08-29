const bcrypt = require("bcrypt");
const userModel = require("../models/airlineModel");

exports.getAirlines = async (name, surname, email) => await userModel.getAirlines(name, surname, email);

exports.newAirline = async (name, identificationcode, email, password) => {
    const hashedpassword = await bcrypt.hash(password, 10);
    return await userModel.newAirline(name, identificationcode, email, hashedpassword);
}