const modelService = require("../services/modelService");
const extraLegService = require("../services/extraLegService");
const planeService = require("../services/planeService");

exports.getModels = async (req, res, next) => {
    try {
        const { id, name } = req.query ?? {};
        const models = await modelService.getModels(id, name);
        res.json(models);
    } catch (err) {
        if (err.code == '22P02') res.status(400).json({ message: "Invalid query parameter" });
        else next(err);
    }
}

exports.newModel = async (req, res, next) => {
    try {
        const { name, seatspc, rowsb, columnsb, rowse, columnse, extralegrows } = req.body ?? {};
        if (name == undefined || seatspc == undefined || rowsb == undefined || columnsb == undefined || rowse == undefined || columnse == undefined) res.status(400).json({ message: "Required data missing" });
        else if (columnsb % 2 == 1 || columnse % 2 == 1 || seatspc < 0 || rowsb < 0 || columnsb < 0 || rowse < 0 || columnse < 0) res.status(400).json({ message: "One or more fields have invalid value" });
        else {
            const model = await modelService.newModel(name, seatspc, rowsb, columnsb, rowse, columnse, extralegrows);
            let nextraleg = 0;
            if (model.length === 1) {
                for (const row of extralegrows) {
                    if (row > 0 && row <= rowse) {
                        nextraleg += await extraLegService.newExtraLeg(model[0].IdModello, row);
                    }
                }
                res.json({ nmodel: 1, nextraleg: nextraleg });
            } else res.status(500).json({ message: "Error during model insertion" });
        }
    } catch (err) {
        if (err.code == '23505' && err.constraint == 'Modelli_Nome_key') res.status(409).json({ message: "Name already in use" });
        else if (err.code == '22P02') res.status(400).json({ message: "Invalid data" });
        else next(err);
    }
}

exports.updateModel = async (req, res, next) => {
    try {
        const { id, name, seatspc, rowsb, columnsb, rowse, columnse, extralegrows } = req.body ?? {};
        if (id == undefined) res.status(400).json({ message: "Id missing" });
        else if (columnsb % 2 == 1 || columnse % 2 == 1 || seatspc < 0 || rowsb < 0 || columnsb < 0 || rowse < 0 || columnse < 0) res.status(400).json({ message: "One or more fields have invalid value" });
        else {
            const planes = await planeService.getPlanes(undefined, undefined, id, undefined, undefined);
            if (planes[0]) res.status(409).json({ message: "Planes existing using this model" });
            else {
                const model = await modelService.getModels(id, undefined);
                if (model[0]) {
                    const nmodel = await modelService.updateModel(id, name || model[0].Nome, seatspc || model[0].PostiPc, rowsb || model[0].RigheB, columnsb || model[0].ColonneB, rowse || model[0].RigheE, columnse || model[0].Colonnee);
                    const extralegs = await extraLegService.getExtraLegs(undefined, id, undefined);
                    let nextraleg = 0;
                    if (extralegrows) {
                        for (const extraleg of extralegs) await extraLegService.deleteExtraLeg(extraleg.IdRiga);
                        for (const row of extralegrows) if (row > 0 && row <= (rowse || model[0].RigheE)) nextraleg += await extraLegService.newExtraLeg(id, row);
                    } else for (const extraleg of extralegs) if (extraleg.NRiga > rowse || model[0].RigheE) await extraLegService.deleteExtraLeg(extraleg.IdRiga);
                    res.json({ nmodel: nmodel, nextraleg: nextraleg });
                } else res.status(400).json({ message: "Model not found" });
            }
        }
    } catch (err) {
        if (err.code == '23505' && err.constraint == 'Modelli_Nome_key') res.status(409).json({ message: "Name already in use" });
        else if (err.code == '22P02') res.status(400).json({ message: "Invalid data" });
        else next(err);
    }
}

exports.deleteModel = async (req, res, next) => {
    try {
        const { id } = req.body ?? {};
        if (id == undefined) res.status(400).json({ message: "Id missing" });
        else {
            const planes = await planeService.getPlanes(undefined, undefined, id, undefined, undefined);
            if (planes[0]) res.status(409).json({ message: "Planes existing using this model" });
            else {
                const extralegs = await extraLegService.getExtraLegs(undefined, id, undefined);
                for (const extraleg of extralegs) await extraLegService.deleteExtraLeg(extraleg.IdRiga);
                res.json({ nmodel: await modelService.deleteModel(id) });
            }
        }
    } catch (err) {
        if (err.code == '22P02') res.status(400).json({ message: "Invalid data" });
        else next(err);
    }
}