const planeService = require("../services/planeService");
const modelService = require("../services/modelService");
const flightService = require("../services/flightService");

exports.getPlanes = async (req, res, next) => {
    try {
        const { id, airline, model, constructionyear } = req.query ?? {};
        let { inservice } = req.query ?? {};
        if (inservice == undefined) inservice = true;
        const planes = await planeService.getPlanes(id, airline, model, constructionyear, inservice);
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

exports.changeService = async (req, res, next) => {
    try {
        const { id, inservice } = req.body ?? {};
        if (id == undefined || inservice == undefined) {
            res.status(400).json({ message: "Required data missing" });
            return;
        }
        const plane = await planeService.getPlanes(id, req.id, undefined, undefined, undefined);
        if (plane[0]) {
            if (plane[0].InServizio == inservice) {
                res.status(409).json({ message: "Service status already updated" });
            } else {
                const flights1 = await flightService.getFlights(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, id, "Programmato");
                const flights2 = await flightService.getFlights(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, id, "Decollato");
                if (flights1[0] || flights2[0]) res.status(409).json({ message: "Flights active using this plane" });
                else {
                    const nplane = await planeService.updatePlane(id, inservice);
                    res.json({ nplane });
                }
            }
        } else res.status(400).json({ message: "Plane not found" });
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