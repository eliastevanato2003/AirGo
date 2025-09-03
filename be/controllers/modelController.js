const modelService = require("../services/modelService");

exports.getModels = async (req, res, next) => {
    try {
        const {id, name} = req.body ?? {};
        const models = await modelService.getModels(id, name);
        res.json({models});
    } catch (err) {
        next(err);
    }
}

exports.newModel = async (req, res, next) => {
    try {
        const { name, seatspc, rowsb, columnsb, rowse, columnse, extralegrows } = req.body ?? {};
        if (!name || !seatspc || !rowsb || !columnsb || !rowse || !columnse) res.status(400).json({ message: "Required data missing" });
        else if (columnsb % 2 == 1 || columnse % 2 == 1 || seatspc < 0 || rowsb < 0 || columnsb < 0 || rowse < 0 || columnse < 0) res.status(400).json({ message: "One or more fields have invalid value" });
        else {
            const nmodel = await modelService.newModel(name, seatspc, rowsb, columnsb, rowse, columnse, extralegrows);
            res.json({nmodel: nmodel });
        }
    } catch (err) {
        if (err.code == '23505' && err.constraint == 'Modelli_Nome_key') res.status(409).json({ message: "Name already in use" });
        else next(err);
    }
}

exports.updateModel = async (req, res, next) => {
    try {
        const {id, name, seatspc, rowsb, columnsb, rowse, columnse} = req.body ?? {};
        const nmodel = await modelService.updateModel(id, name, seatspc, rowsb, columnsb, rowse, columnse);
        res.json({nmodel: nmodel});
    } catch (err) {
        next(err);
    }
}

exports.deleteModel = async (req, res, next) => {
    try {
        const { id } = req.body ?? {};
        const nmodel = await modelService.deleteModel(id);
        res.json({nmodel: nmodel});
    } catch (err) {
        next(err);
    }
}