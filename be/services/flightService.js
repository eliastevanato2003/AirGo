const flightModel = require("../models/flightModel");
const extraLegService = require("../services/extraLegService");

exports.getFlights = async (id, airline, departure, arrival, mindatedeparture, maxdatedeparture, mindatearrival, maxdatearrival, order, plane) => await flightModel.getFlights(id, airline, departure, arrival, mindatedeparture, maxdatedeparture, mindatearrival, maxdatearrival, order, plane);

exports.getFlightStatus = async (id) => {
    const flight = await flightModel.getFlightStatus(id);
    if (flight[0]) {
        const rows = await extraLegService.getExtraLegs(undefined, flight[0].IdModello, undefined);
        flight[0].RigheExtraLeg = rows;
    }
    return flight;
}

exports.newFlight = async (plane, route, schdepdate, scharrdate, pcprize, bprize, eprize, bagprize, lrprize, scprize) => await flightModel.newFlight(plane, route, schdepdate, scharrdate, pcprize, bprize, eprize, bagprize, lrprize, scprize);

exports.deleteFlight = async (id) => await flightModel.deleteFlight(id);