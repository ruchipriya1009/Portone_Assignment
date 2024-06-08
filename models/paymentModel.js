class PaymentIntentRequest {                             // creating data objects 
    constructor(amount, currency) {
      this.amount = amount;
      this.currency = currency;
    }
  }
  
  module.exports = PaymentIntentRequest;
  