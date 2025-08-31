const flightRouteModel = require("../models/flightRouteModel");

exports.newFlightRoute = async (departure, arrival, airline) => await flightRouteModel.newFlightRoute(departure, arrival, airline);