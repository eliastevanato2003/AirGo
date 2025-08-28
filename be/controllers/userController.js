const userService = require("../services/userService")

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (err) {
    next(err); 
  }
};

exports.newUser = async(req, res, next) => {
  try{
    const {name, surname, email, password, number, dob} = req.body;
    const user = await userService.newUser(name, surname, email, password, number, dob);
    res.json(user);
  } catch (err) {
    next(err);
  }
}