// models/payment.js
const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
  paymentId:String,
  orderId: String,
  amount: Number,
  currency: String,
  status: String,
}, { timestamps: true });

const paymentModels = mongoose.model('Payment', paymentSchema);
module.exports =paymentModels;
