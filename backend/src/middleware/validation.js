import { validationResult } from 'express-validator';

/**
 * Validation middleware
 * Checks for validation errors from express-validator
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
  }
  
  next();
};

export default validate;
