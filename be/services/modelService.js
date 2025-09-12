const modelModel = require("../models/modelModel");
const extraLegService = require("../services/extraLegService");

exports.getModels = async (id, name) => {
    const tempmodels = await modelModel.getModels(id, name);
    let models = [];
    for (const model of tempmodels) {
        model.RigheExtraLeg = await extraLegService.getExtraLegs(undefined, model.IdModello, undefined);
        models.push(model);
    };
    return models;
};

exports.newModel = async (name, seatspc, rowsb, columnsb, rowse, columnse) => await modelModel.newModel(name, seatspc, rowsb, columnsb, rowse, columnse);

exports.updateModel = async (id, name, seatspc, rowsb, columnsb, rowse, columnse) => await modelModel.updateModel(id, name, seatspc, rowsb, columnsb, rowse, columnse);

exports.deleteModel = async (id) => await modelModel.deleteModel(id);