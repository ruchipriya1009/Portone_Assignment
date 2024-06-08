require("dotenv").config();

// intitalized and imported stripe secret key from .env file

module.exports = {
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
};
