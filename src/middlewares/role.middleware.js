const Role = require('../enums/Role');

const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User not authenticated',
        });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to access this resource',
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while checking roles',
      });
    }
  };
};

module.exports = roleMiddleware;
