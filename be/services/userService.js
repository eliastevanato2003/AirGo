const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const airlineModel = require("../models/airlineModel");
const JWT_SECRET = require("../configure");

exports.getUsers = async (id, name, surname, email) => await userModel.getUsers(id, name, surname, email);

exports.getUser = async (id) => {
    const users = await userModel.getUsers(id, undefined, undefined, undefined);
    return users?.[0] ?? {};
}

exports.newUser = async (name, surname, email, password, number, dob) => {
    const hashedpassword = await bcrypt.hash(password, 10);
    return await userModel.newUser(name, surname, email, hashedpassword, number, dob);
}

exports.login = async (email, password) => {
    const user = await userModel.getUsers(undefined, undefined, undefined, email);
    const airline = await airlineModel.getAirlines(undefined, undefined, undefined, email);
    const pw = user[0] ? user[0].Password : airline[0] ? airline[0].Password : "";
    if (!user || !(await bcrypt.compare(password, pw)))
        throw new Error('Invalid credentials');    
    const role = !user[0] ? 1 : user[0].Admin ? 0 : 2;
    const id = !user[0] ? airline[0].IdCompagniaAerea : user[0].IdUtente;
    const token = jwt.sign({ email: email, role: role, id: id }, JWT_SECRET, { expiresIn: '1h' });
    return token;
}