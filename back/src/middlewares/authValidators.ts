import { body } from "express-validator";

export const registerValidators = [
  body("name").trim().isLength({ min: 1, max: 80 }),
  body("lastName").trim().isLength({ min: 1, max: 80 }),
  body("email").trim().isEmail().normalizeEmail(),
  body("password")
    .isLength({ min: 8, max: 128 })
    .withMessage("Password must be at least 8 characters")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[!?@#$%^&*]/)
    .withMessage("Password must contain at least one special character"),
];

export const loginValidators = [
  body("email").trim().isEmail().normalizeEmail(),
  body("password").isLength({ min: 1, max: 128 }),
];
