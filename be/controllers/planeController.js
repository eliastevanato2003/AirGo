const planeService = require("../services/planeService");

exports.getPlanes = async (req, res, next) => {
    try {
        const { id, airline, model, constructionyear } = req.query ?? {};
        const planes = await planeService.getPlanes(id, airline, model, constructionyear);
        res.json({planes});
    } catch (err) {
        next(err);
    }
}

exports.newPlane = async (req, res, next) => {
    try {
        const { model, constructionyear } = req.body ?? {};
        const airline = req.id;
        const nplane = await planeService.newPlane(airline, model, constructionyear);
        res.json({nplane: nplane});
    } catch (err) {
        next(err);
    }
} 

exports.deletePlane = async (req, res, next) => {
    try {
        const { id } = req.body ?? {};
        const nplane = await planeService.deletePlane(id);
        res.json({nplane: nplane});
    } catch (err) {
        next(err);
    }
}