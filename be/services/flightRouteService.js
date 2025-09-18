const flightRouteModel = require("../models/flightRouteModel");

exports.getFlightRoutes = async (id, departure, arrival, airline) => await flightRouteModel.getFlightRoutes(id, departure, arrival, airline);

exports.newFlightRoute = async (departure, arrival, airline) => await flightRouteModel.newFlightRoute(departure, arrival, airline);

exports.updateFlightRoute = async (id, departure, arrival) => await flightRouteModel.updateFlightRoute(id, departure, arrival);

exports.deleteFlightRoute = async (id, airline) => await flightRouteModel.deleteFlightRoute(id, airline);