const extraLegModel = require("../models/extraLegModel");

exports.getExtraLegs = async (id, model, row) => await extraLegModel.getExtraLegs(id, model, row);

exports.newExtraLeg = async (model, row) => await extraLegModel.newExtraLeg(model, row);

exports.deleteExtraLeg = async (id) => await extraLegModel.deleteExtraLeg(id);