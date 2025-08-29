const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const JWT_SECRET = require("../configure");

exports.getUsers = async (name, surname, email) => await userModel.getUsers(name, surname, email);

exports.newUser = async (name, surname, email, password, number, dob) => {
    const hashedpassword = await bcrypt.hash(password, 10);
    return await userModel.newUser(name, surname, email, hashedpassword, number, dob);
}

exports.login = async (email, password) => {
    const user = await userModel.getUsers(undefined, undefined, email);
    if (!user || !(await bcrypt.compare(password, user[0].Password))) {
        throw new Error('Invalid credentials');
    }
    else {
        const token = jwt.sign({ email: user[0].Email }, JWT_SECRET, { expiresIn: '1h' });
        return token;
    }
}