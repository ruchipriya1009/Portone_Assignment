const express = require("express");
const router = express.Router();
const paymentController = require("../../controllers/paymentContollers");
const {
  validatePaymentIntent,
  validateIdParam,
} = require("../../middleware/validation");

router.post(
  "/create_intent",
  validatePaymentIntent,
  paymentController.createPaymentIntent
);
router.post(
  "/capture_intent/:id",
  validateIdParam,
  paymentController.capturePaymentIntent
);
router.post(
  "/create_refund/:id",
  validateIdParam,
  paymentController.createRefund
);
router.get("/get_intents", paymentController.listPaymentIntents);

module.exports = router;
