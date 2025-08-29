const userService = require("../services/userService");

exports.getUsers = async (req, res, next) => {
    try {
        const { name, surname, email } = req.body ?? {};
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
        res.json({ "token": token });
    } catch (err) {
        res.status(401).json({ message: "Invalid credentials" });
    }
};