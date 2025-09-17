const planeModel = require("../models/planeModel");

exports.getPlanes = async (id, airline, model, constructionyear, inservice) => await planeModel.getPlanes(id, airline, model, constructionyear, inservice);

exports.newPlane = async (airline, model, constructionyear) => await planeModel.newPlane(airline, model, constructionyear);

exports.updatePlane = async (id, inservice) => await planeModel.updatePlane(id, inservice);

exports.deletePlane = async (id) => await planeModel.deletePlane(id);