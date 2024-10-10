import Joi from 'joi';

const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Invalid email format'
  }),
  name: Joi.string().min(3).max(30).required().messages({
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name cannot exceed 30 characters',
    'any.required': 'Name is required',
  }),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character',
      'any.required': 'Password is required',
    })
});

export const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  next();
};