const bcrypt = require("bcrypt");
const airlineModel = require("../models/airlineModel");

exports.getAirlines = async (id, name, identificationcode, email) => await airlineModel.getAirlines(id, name, identificationcode, email);

exports.getAirline = async (id) => {
    const airlines = await airlineModel.getAirlines(id, undefined, undefined, undefined);
    return airlines?.[0] ?? {};
}

exports.newAirline = async (name, identificationcode, email, password) => {
    const hashedpassword = await bcrypt.hash(password, 10);
    return await airlineModel.newAirline(name, identificationcode, email, hashedpassword);
}

exports.updateAirline = async (id, name, identificationcode, password) => {
    if(password) {
        const hashedpassword = await bcrypt.hash(password, 10);
        await airlineModel.updatePassword(id, hashedpassword);
    }
    return await airlineModel.updateAirline(id, name, identificationcode);
}

exports.deleteAirline = async (id) => await airlineModel.deleteAirline(id);