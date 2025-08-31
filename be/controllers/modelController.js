const modelService = require("../services/modelService");

exports.newModel = async (req, res, next) => {
    try {
        const { name, seatspc, rowsb, columnsb, rowse, columnse, extralegrows } = req.body ?? {};
        if (!name || !seatspc || !rowsb || !columnsb || !rowse || !columnse) res.status(400).json({ message: "Required data missing" });
        else if (columnsb % 2 == 1 || columnse % 2 == 1 || seatspc < 0 || rowsb < 0 || columnsb < 0 || rowse < 0 || columnse < 0) res.status(400).json({ message: "One or more fields have invalid value" });
        else {
            const nmodel = await modelService.newModel(name, seatspc, rowsb, columnsb, rowse, columnse, extralegrows);
            res.json({ "nmodel": nmodel });
        }
    } catch (err) {
        if (err.code == '23505' && err.constraint == 'Modelli_Nome_key') res.status(409).json({ message: "Name already in use" });
        else next(err);
    }
}