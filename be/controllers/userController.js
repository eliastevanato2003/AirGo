const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userService = require("../services/userService");

const JWT_SECRET = 'prova'; 

exports.getUsers = async (req, res, next) => {
  try {
    const {name, surname, email } = req.body ?? {};
    const users = await userService.getUsers(name, surname, email);
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.newUser = async (req, res, next) => {
  try {
    const { name, surname, email, password, number, dob } = req.body ?? {};
    const user = await userService.newUser(name, surname, email, password, number, dob);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await userService.login(email, password);
    res.json({"token" : token});
  } catch (err) {
    res.status(401).json({message: "Credenziali non valide"});
  }    
};

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(token == null) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}