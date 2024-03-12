const paymentModels = require("../models/paymentmodel");
const bookingModel = require("../models/bookingModel");
const razorpay = require("razorpay");
const dotenv = require("dotenv");
dotenv.config();
const initiate = async (req, res) => {
  const { amount, currency } = req.body;
  const instance = new razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
  });
  instance.orders
    .create({
      amount: amount * 100,
      currency: currency,
    })
    .then((order) => {
      const payment = new paymentModels({
        orderId: order.id,
        amount: amount,
        currency: currency,
        status: "pending",
      });
      return payment.save();
    })
    .then((savedPayment) => {
      res.json({ message: "order created", data: savedPayment });
    })
    .catch((error) => {
      console.error("Error occurred during order creation:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};
const capture_payment = async (req, res) => {
  const { paymentId, orderId } = req.body;
  if (!razorpay) {
    res.status(500).send("Razorpay object not initialized");
    return;
  }
  const data = await paymentModels.findOneAndUpdate(
    { orderId: orderId },
    { $set: { paymentId: paymentId } }
  );
  const instance = new razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
  });
  try {
    const payment = await instance.payments.fetch(paymentId);
    console.log(" const payment = ", payment);
    if (
      payment &&
      payment.order_id === orderId &&
      payment.status === "captured"
    ) {
      console.log("order id ", bookingModel);
      const { id: user_id } = req.userData;
      const data = await bookingModel.findOneAndUpdate(
        { user_id: user_id },
        { $set: { status: "Success" } }
      );
      console.log("data ==", data);
      res
        .status(200)
        .send({ message: "Payment successful, Your booking is confirmed!" });
    } else {
      const data2 = await bookingModel.findOneAndUpdate(
        { orderId: orderId },
        { $set: { status: "Cancelled" } }
      );
      return res
        .status(400)
        .send({
          message: "Payment failed, Your booking is failed!",
          data2: data2,
        });
    }
  } catch (error) {
    console.error("Error capturing payment:", error);
    return res.status(500).send("Error capturing payment: " + error.message);
  }
};
module.exports = { initiate, capture_payment };
