import { validationResult } from 'express-validator';

/**
 * Validation middleware
 * Checks for validation errors from express-validator
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req); // Get validation errors from express-validator
  
  if (!errors.isEmpty()) { 
    return res.status(400).json({ // return in json format
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
  }
  
  next(); // if no errors, continue to next middleware
};

export default validate;
