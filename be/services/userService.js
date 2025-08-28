const bcrypt = require("bcrypt")
const userModel = require("../models/userModel");

exports.getUsers = async () => await userModel.getUsers();

exports.newUser = async (name, surname, email, password, number, dob) => {
    const hashedpassword = await bcrypt.hash(password, 10);
    return await userModel.newUser(name, surname, email, hashedpassword, number, dob);
}