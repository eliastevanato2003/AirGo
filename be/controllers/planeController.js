const planeService = require("../services/planeService");

exports.newPlane = async (req, res, next) => await planeService.newPlane();