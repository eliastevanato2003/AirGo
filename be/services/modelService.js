const modelModel = require("../models/modelModel");

exports.newModel = async (name, seatspc, rowsb, columnsb, rowse, columnse) => await modelModel(name, seatspc, rowsb, columnsb, rowse, columnse);