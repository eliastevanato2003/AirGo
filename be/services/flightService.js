const flightModel = require("../models/flightModel");

exports.getFlights = async (id, airline, departure, arrival, mindatedeparture, maxdatedeparture, mindatearrival, maxdatearrival, order, plane) => await flightModel.getFlights(id, airline, departure, arrival, mindatedeparture, maxdatedeparture, mindatearrival, maxdatearrival, order, plane);

exports.getFlightStatus = async (id) => await flightModel.getFlightStatus(id);

exports.newFlight = async (plane, route, schdepdate, scharrdate, pcprize, bprize, eprize, bagprize, lrprize, scprize) => await flightModel.newFlight(plane, route, schdepdate, scharrdate, pcprize, bprize, eprize, bagprize, lrprize, scprize);

exports.deleteFlight = async (id) => await flightModel.deleteFlight(id);