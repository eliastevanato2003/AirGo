const modelModel = require("../models/modelModel");

exports.newModel = async (name, seatspc, rowsb, columnsb, rowse, columnse, extralegrows) => await modelModel.newModel(name, seatspc, rowsb, columnsb, rowse, columnse, extralegrows);