const stripe = require("stripe")(require("../config/config").stripeSecretKey);
const PaymentIntentRequest = require("../models/paymentModel");
const { JSONResponse, ErrorResponse } = require("../views/response");
const logger = require("../logger/logger");

// creating the PaymentIntent

exports.createPaymentIntent = async (req, res) => {
  const { amount, currency } = req.body;
  const paymentIntentRequest = new PaymentIntentRequest(amount, currency);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentIntentRequest.amount,
      currency: paymentIntentRequest.currency,
      payment_method: "pm_card_us",
      payment_method_types: ["card"],
      payment_method_options: {
        card: {
          capture_method: "manual",
        },
      },
      confirm: true,
    });
    logger.info("Payment intent created", { paymentIntent });
    JSONResponse(res, 201, paymentIntent);
  } catch (error) {
    logger.error("Error creating payment intent", { error });
    ErrorResponse(res, 500, error.message);
  }
};

// capturing paymentintent by id

exports.capturePaymentIntent = async (req, res) => {
  const { id } = req.params;

  try {
    const paymentIntent = await stripe.paymentIntents.capture(id);
    logger.info("Payment intent captured", { paymentIntent });
    JSONResponse(res, 200, paymentIntent);
  } catch (error) {
    logger.error("Error capturing payment intent", { error });
    ErrorResponse(res, 500, error.message);
  }
};

exports.createRefund = async (req, res) => {
  const { id } = req.params;

  try {
    const refund = await stripe.refunds.create({
      payment_intent: id,
    });
    logger.info("Payment refunded", { refund });
    JSONResponse(res, 201, refund);
  } catch (error) {
    logger.error("Error creating refund", { error });
    ErrorResponse(res, 500, error.message);
  }
};

// listing all the payment intents
exports.listPaymentIntents = async (req, res) => {
  try {
    const paymentIntents = await stripe.paymentIntents.list();
    logger.info("Paymentintents are fetched succesfully", { paymentIntents });
    JSONResponse(res, 200, paymentIntents);
  } catch (error) {
    logger.error("Error listing payment intents", { error });
    ErrorResponse(res, 500, error.message);
  }
};
