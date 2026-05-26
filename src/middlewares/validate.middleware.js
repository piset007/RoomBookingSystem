const Joi = require('joi');

const validateMiddleware = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const messages = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages,
      });
    }

    req.validatedData = value;
    next();
  };
};

// Example validation schemas
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  role: Joi.string().valid('ADMIN', 'TEACHER', 'STUDENT').required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const createRoomSchema = Joi.object({
  roomNumber: Joi.string().required(),
  name: Joi.string().required(),
  capacity: Joi.number().min(1).required(),
  location: Joi.string().optional(),
  building: Joi.string().optional(),
  floor: Joi.number().optional(),
  amenities: Joi.array().optional(),
  description: Joi.string().optional(),
});

const createBookingSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  roomId: Joi.string().uuid().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  purpose: Joi.string().optional(),
  attendeeCount: Joi.number().optional(),
  notes: Joi.string().optional(),
});

module.exports = {
  validateMiddleware,
  registerSchema,
  loginSchema,
  createRoomSchema,
  createBookingSchema,
};
