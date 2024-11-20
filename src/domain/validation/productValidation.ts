import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Schema for validating product data
const productSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  category: Joi.string().min(3).max(50).required(),
  price: Joi.number().positive().precision(2).required(),
});

// Middleware for validating product data
export const validateProduct = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { error } = productSchema.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next(); // Proceed to the next middleware or controller if validation passes
  }
};
