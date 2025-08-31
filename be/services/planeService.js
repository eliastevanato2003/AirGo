const planeModel = require("../models/planeModel");

exports.newPlane = async (airline, model, constructionyear) => await planeModel.newPlane(airline, model, constructionyear);