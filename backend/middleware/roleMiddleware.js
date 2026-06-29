const ADMIN_ROLES = ["Super Admin", "Admin"];

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "You do not have permission for this action" });
    }

    next();
  };
};

const canManageProject = (req, res, next) => {
  const allowed = [...ADMIN_ROLES, "Project Manager", "Team Lead"];
  return authorize(...allowed)(req, res, next);
};

module.exports = { authorize, canManageProject, ADMIN_ROLES };
