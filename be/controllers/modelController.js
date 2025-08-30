const modelService = require("../services/modelService");

exports.newModel = async (req, res, next) => {
    try {
        const { name, seatspc, rowsb, columnsb, rowse, columnse } = req.body ?? {};
        if(!name || !surname || !email || !password || !number || !dob) res.status(400).json({message: "Required data missing"});
        const nmodel = await modelService.newModel(name, seatspc, rowsb, columnsb, rowse, columnse);
        res.json({ "nmodel": nmodel });
    } catch (err) {
        /*if (err.code == '23505' && err.constraint == 'Utenti_Telefono_key') res.status(409).json({ message: "Phone number already in use" });
        else if (err.code = '23505' && err.constraint == 'IndirizziEmail_Email_key') res.status(409).json({ message: "Email already in use" })
        else */next(err);
    }
}