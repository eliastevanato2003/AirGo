const modelModel = require("../models/modelModel");

exports.getModels = async (id, name) => await modelModel.getModels(id, name);

exports.newModel = async (name, seatspc, rowsb, columnsb, rowse, columnse) => await modelModel.newModel(name, seatspc, rowsb, columnsb, rowse, columnse);

exports.updateModel = async (id, name, seatspc, rowsb, columnsb, rowse, columnse) => await modelModel.updateModel(id, name, seatspc, rowsb, columnsb, rowse, columnse);

exports.deleteModel = async (id) => await modelModel.deleteModel(id);