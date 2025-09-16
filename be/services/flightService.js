const flightModel = require("../models/flightModel");
const extraLegService = require("../services/extraLegService");

exports.getFlights = async (id, airline, departure, arrival, mindatedeparture, maxdatedeparture, mindatearrival, maxdatearrival, order, plane, status) => await flightModel.getFlights(id, airline, departure, arrival, mindatedeparture, maxdatedeparture, mindatearrival, maxdatearrival, order, plane, status);

exports.getFlightStatus = async (id) => {
    const flight = await flightModel.getFlightStatus(id);
    if (flight[0]) {
        const rows = await extraLegService.getExtraLegs(undefined, flight[0].IdModello, undefined);
        flight[0].RigheExtraLeg = rows;
    }
    return flight;
}

exports.newFlight = async (plane, route, schdepdate, scharrdate, pcprice, bprice, eprice, bagprice, lrprice, scprice) => await flightModel.newFlight(plane, route, schdepdate, scharrdate, pcprice, bprice, eprice, bagprice, lrprice, scprice);

exports.updateFlight = async (id, effdepdate, effarrdate, status, pcprice, bprice, eprice) => await flightModel.updateFlight(id, effdepdate, effarrdate, status, pcprice, bprice, eprice);

exports.deleteFlight = async (id) => await flightModel.deleteFlight(id);