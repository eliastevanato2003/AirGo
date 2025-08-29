const userService = require("../services/userService");

exports.getUsers = async (req, res, next) => {
    try {
        const { id, name, surname, email } = req.query ?? {};
        const users = await userService.getUsers(id, name, surname, email);
        res.json(users);
    } catch (err) {
        next();
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const id =  req.id;
        const user = await userService.getUser(id);
        res.json(user);
    } catch (err) {
        next();
    }
}

exports.newUser = async (req, res, next) => {
    try {
        const { name, surname, email, password, number, dob } = req.body ?? {};
        if(!name || !surname || !email || !password || !number || !dob) res.status(400).json({message: "Required data missing"});
        const nuser = await userService.newUser(name, surname, email, password, number, dob);
        res.json({ "nusers": nuser });
    } catch (err) {
        if (err.code == '23505' && err.constraint == 'Utenti_Telefono_key') res.status(409).json({ message: "Phone number already in use" });
        else if (err.code = '23505' && err.constraint == 'Utenti_Email_key') res.status(409).json({ message: "Email already in use" })
        else next(err);
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