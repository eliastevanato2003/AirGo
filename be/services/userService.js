const userModel = require("../models/userModel");

exports.getUsers = async () => await userModel.getUsers();