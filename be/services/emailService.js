const emailModel = require("../models/emailModel")

exports.getEmails = async (id, email) => emailModel.getEmails(id, email);

exports.newEmail = async (email) => emailModel.newEmail(email);

exports.updateEmail = async (id, email) => emailModel.updateEmail(id, email);

exports.deleteEmail = async (email) => emailModel.deleteEmail(email);