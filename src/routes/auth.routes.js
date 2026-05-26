const express = require('express');
const AuthController = require('../controllers/AuthController');
const { validateMiddleware, registerSchema, loginSchema } = require('../middlewares/validate.middleware');

const router = express.Router();
const authController = new AuthController();

// Auth routes
router.post(
  '/register',
  validateMiddleware(registerSchema),
  (req, res) => authController.register(req, res)
);

router.post(
  '/login',
  validateMiddleware(loginSchema),
  (req, res) => authController.login(req, res)
);

router.post('/verify-token', (req, res) => authController.verifyToken(req, res));

module.exports = router;
