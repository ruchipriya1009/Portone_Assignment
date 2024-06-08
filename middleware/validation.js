const { body, param, validationResult } = require("express-validator");

exports.validatePaymentIntent = [
  body("amount")
    .isInt({ gt: 0 })
    .withMessage("Amount must be a positive integer"),
  body("currency")
    .isLength({ min: 3, max: 3 })
    .withMessage("Currency must be a 3-letter code"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateIdParam = [
  param("id").isString().withMessage("ID must be a string"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
