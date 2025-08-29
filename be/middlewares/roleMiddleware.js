exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.email) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    if (!allowedRoles.includes(req.role)) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    next();
  };
};  