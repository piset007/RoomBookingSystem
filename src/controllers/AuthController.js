const AuthService = require('../services/AuthService');

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async register(req, res) {
    try {
      const { email, password, firstName, lastName, role } = req.body;

      const result = await this.authService.register({
        email,
        password,
        firstName,
        lastName,
        role,
      });

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const result = await this.authService.login(email, password);

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result,
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }

  async verifyToken(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Token not provided',
        });
      }

      const decoded = await this.authService.verifyToken(token);

      return res.status(200).json({
        success: true,
        message: 'Token is valid',
        data: decoded,
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = AuthController;
