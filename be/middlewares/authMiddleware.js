const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../configure");

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({message: "Missing auth token"});
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(401).json({message: ("Invalid token")});
        req.email = user.email;
        req.id = user.id;
        req.role = user.role;
        next();
    });
};
