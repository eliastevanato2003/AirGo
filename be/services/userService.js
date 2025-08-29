const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const airlineModel = require("../models/airlineModel");
const JWT_SECRET = require("../configure");

exports.getUsers = async (name, surname, email) => await userModel.getUsers(name, surname, email);

exports.getUser = async (email) => {
    const users = await userModel.getUsers(undefined, undefined, email);
    return users?.[0] ?? {};
}

exports.newUser = async (name, surname, email, password, number, dob) => {
    const hashedpassword = await bcrypt.hash(password, 10);
    return await userModel.newUser(name, surname, email, hashedpassword, number, dob);
}

//Trigger per l'email
exports.login = async (email, password) => {
    const user = await userModel.getUsers(undefined, undefined, email);
    const airline = await airlineModel.getAirlines(undefined, undefined, email);
    if (!user || !(await bcrypt.compare(password, user[0].Password))) 
        if (!airline || !(await bcrypt.compare(password, airline[0].Password))) 
            throw new Error('Invalid credentials');
    const role = !user ? 1 : user[0].Admin ? 0 : 2;
    const token = jwt.sign({ email: user[0].Email, role: role }, JWT_SECRET, { expiresIn: '1h' });    
    return token;

}