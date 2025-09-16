const flightModel = require("../models/flightModel");
const extraLegService = require("../services/extraLegService");

exports.getFlights = async (id, airline, departure, arrival, mindatedeparture, maxdatedeparture, mindatearrival, maxdatearrival, order, plane, status) => await flightModel.getFlights(id, airline, departure, arrival, mindatedeparture, maxdatedeparture, mindatearrival, maxdatearrival, order, plane, status);

exports.getFlightsJoin = async (airline, departure, arrival, mindatedeparture, maxdatedeparture, mindatearrival, maxdatearrival, order, plane, status) => {
    let result = await flightModel.getFlightsJoin(airline, departure, arrival, mindatedeparture, maxdatedeparture, mindatearrival, maxdatearrival, order, plane, status);
    for (let i = 0; i < result.length; i++) {
        result[i] = normalizeFlights(result[i]);
    }
    return result;
}

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

function normalizeFlights(flights) {
    const result = {
        V1: { ...flights.V1 }, 
        V2: { ...flights.V2 }  
    };
    for (const key of Object.keys(flights)) {
        if (key === 'V1' || key === 'V2');
        else if (key.endsWith("1")) {
            const newKey = key.slice(0, -1);
            result.V1[newKey] = flights[key];
        } else if (key.endsWith('2')) {
            const newKey = key.slice(0, -1); 
            result.V2[newKey] = flights[key];
        }
    }
    return result;
}