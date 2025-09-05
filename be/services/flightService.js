const flightModel = require("../models/flightModel");

exports.getFlights = async (id, departure, arrival) => await flightModel.getFlights(id, departure, arrival);

exports.newFlight = async (plane, route, schdepdate, scharrdate, actdepdate, actarrdate, state, pcprize, bprize, eprize, bagprize, lrprize, scprize) => await flightModel.newFlight(plane, route, schdepdate, scharrdate, actdepdate, actarrdate, state, pcprize, bprize, eprize, bagprize, lrprize, scprize);

exports.deleteFlight = async (id) => await flightModel.deleteFlight(id);