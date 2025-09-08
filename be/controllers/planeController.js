const planeService = require("../services/planeService");
const modelService = require("../services/modelService");

exports.getPlanes = async (req, res, next) => {
    try {
        const { id, airline, model, constructionyear } = req.query ?? {};
        const planes = await planeService.getPlanes(id, airline, model, constructionyear);
        res.json(planes);
    } catch (err) {
        if (err.code == '22P02') res.status(400).json({ message: "Invalid query parameter" });
        else next(err);
    }
}

exports.newPlane = async (req, res, next) => {
    try {
        const { model, constructionyear } = req.body ?? {};
        if (model == undefined || constructionyear == undefined) res.status(400).json({ message: "Required data missing" });
        const models = await modelService.getModels(model, undefined);
        if (models[0]) {
            const airline = req.id;
            const nplane = await planeService.newPlane(airline, model, constructionyear);
            res.json({ nplane: nplane });
        } else res.status(400).json({ message: "Model not found" });
    } catch (err) {
        if (err.code == '22P02') res.status(400).json({ message: "Invalid data" });
        else next(err);
    }
}

exports.deletePlane = async (req, res, next) => {
    try {
        const { id } = req.body ?? {};
        const nplane = await planeService.deletePlane(id);
        res.json({ nplane: nplane });
    } catch (err) {
        next(err);
    }
}