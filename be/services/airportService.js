const airportModel = require("../models/airportModel")

exports.newAirport = async (city, country, name, identificationcode) => await airportModel.newAirport(city, country, name, identificationcode); 