const planeModel = require("../models/planeModel");

exports.getPlanes = async (id, airline, model, constructionyear) => await planeModel.getPlanes(id, airline, model, constructionyear);

exports.newPlane = async (airline, model, constructionyear) => await planeModel.newPlane(airline, model, constructionyear);

exports.deletePlane = async (id) => await planeModel.deletePlane(id);