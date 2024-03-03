const paymentModels = require("../models/paymentmodel");
const razorpay = require("razorpay");
const { v4: uuidv4 } = require('uuid');

const instance = new razorpay({
  key_id: "rzp_test_kQpwgl0U7suVP7",
  key_secret: "QaLsY8bEZMoD1sDFoOTlACeW",
});
const initiate = async (req, res) => {
  const { amount, currency } = req.body;
  const paymentId = uuidv4();
  const order = await instance.orders.create({
    amount: amount * 100, // Amount in paisa
    currency: currency,
  });
  const Payment = new paymentModels({
    paymentId :paymentId,
    orderId: order.id,
    amount: amount,
    currency: currency,
    status: "pending",
  });
  await Payment.save();
  res.json({ orderId: order.id, amount: order.amount ,paymentId:paymentId});
};
const capture_payment = async (req, res) => {
  const { paymentId, orderId } = req.body;
  try {
    const payment = await paymentModels.findOne({ orderId: orderId });
    console.log("payment = ", payment);
    if (!payment) {
      return res.status(404).send("Payment not found");
    }
    const capturedPayment = await razorpay.payments.capture(
      paymentId,
      payment.amount,
      "INR"
    );
    payment.status = "success";
    const data = await paymentModels.save();
    console.log("data ==", data);
    res.json(capturedPayment);
  } catch (error) {
    console.error("Error occurred during payment capture:", error);
    res.status(500).json({ error: "Internal server error" });
  }
 
};
module.exports = { initiate, capture_payment };
