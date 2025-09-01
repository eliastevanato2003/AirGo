const airportModel = require("../models/airportModel")

exports.getAirports = async (id, city, country, identificationcode) => await airportModel.getAirports(id, city, country, identificationcode);

exports.newAirport = async (city, country, name, identificationcode) => await airportModel.newAirport(city, country, name, identificationcode); 

exports.updateAirport = async (id, city, country, name, identificationcode) => await airportModel.updateAirport(id, city, country, name, identificationcode);

exports.deleteAirport = async (id) => await airportModel.deleteAirport(id);