
//checking roles
const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: "You don't have permission to do that." });
  }
  next();
};

module.exports = requireRole;
