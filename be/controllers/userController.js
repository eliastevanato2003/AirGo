const userService = require("../services/userService");
const emailService = require("../services/emailService");

exports.getUsers = async (req, res, next) => {
    try {
        const { id, name, surname, email } = req.query ?? {};
        const users = await userService.getUsers(id, name, surname, email);
        res.json(users);
    } catch (err) {
        next(err);
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const id = req.id;
        const user = await userService.getUser(id);
        res.json(user);
    } catch (err) {
        next(err);
    }
}

exports.newUser = async (req, res, next) => {
    try {
        const { name, surname, email, password, number, dob } = req.body ?? {};
        if (!name || !surname || !email || !password || !number || !dob) res.status(400).json({ message: "Required data missing" });
        else {
            const mail = await emailService.newEmail(email);
            if (mail[0]) {
                const nuser = await userService.newUser(name, surname, mail[0].IdEmail, password, number, dob);
                res.json({ nuser: nuser });
            } else res.status(500).json({ message: "Error during email insertion" });
        }
    } catch (err) {
        if (err.code == '23505' && err.constraint == 'IndirizziEmail_Email_key') res.status(409).json({ message: "Email already in use" });
        else {
            await emailService.deleteEmail(req.body.email);
            if (err.code == '23505' && err.constraint == 'Utenti_Telefono_key') res.status(409).json({ message: "Phone number already in use" });
            else if (err.routine == 'DateTimeParseError') res.status(400).json({ message: "Invalid date" });
            else next(err);
        }
    }
}

//check biglietti attivi
exports.updateUser = async (req, res, next) => {
    try {
        const { name, surname, email, password, number, dob } = req.body ?? {};
        const user = await userService.getUser(req.id);
        if (user.IdUtente) {
            if (email) await emailService.updateEmail(user.Mail, email);
            const nuser = await userService.updateUser(req.id, name || user.Nome, surname || user.Cognome, number || user.Telefono, dob || user.DoB, password);
            res.json({ nuser: nuser });
        } else res.status(500).json({message: "User not found"});
    } catch (err) {
        if (err.code == '23505' && err.constraint == 'Utenti_Telefono_key') res.status(409).json({ message: "Phone number already in use" });
        else if (err.code == '23505' && err.constraint == 'IndirizziEmail_Email_key') res.status(409).json({ message: "Email already in use" })
        else if (err.routine == 'DateTimeParseError') res.status(400).json({ message: "Invalid date" });
        else next(err);
    }
}

//check biglietti attivi
exports.deleteUser = async (req, res, next) => {
    try {
        const nuser = await userService.deleteUser(req.id);
        if(nuser >= 1) await emailService.deactivateEmail(req.email);
        res.json({ nuser: nuser });
    } catch (err) {
        next(err);
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body ?? {};
    if (!email || !password) res.status(400).json({ message: "Required data missing" });
    try {
        const token = await userService.login(email, password);
        res.json(token);
    } catch (err) {
        res.status(401).json({ message: "Invalid credentials" });
    }
};