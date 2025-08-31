const planeService = require("../services/planeService");

exports.newPlane = async (req, res, next) => {
    try {
        const { airline, model, constructionyear } = req.body ?? {};
        const nplane = await planeService.newPlane(airline, model, constructionyear);
        res.json({plane: nplane});
    } catch (err) {
        next(err);
    }
    

} 