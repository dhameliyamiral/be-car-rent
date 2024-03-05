const paymentModels = require("../models/paymentmodel");
const razorpay = require("razorpay");
const dotenv = require("dotenv");
dotenv.config();
(key_id = process.env.key_id), (key_secret = process.env.key_secret);
const initiate = async (req, res) => {
  const { amount, currency } = req.body;
  const instance = new razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
  });
  // console.log("instance =",instance);
  // const instance = new razorpay({
  //   key_id: "rzp_test_gO03fR1qTORv8s",
  //   key_secret: "J3hzFOZjIWlUsMOOprKhHrXL",
  // });
  instance.orders
    .create({
      amount: amount * 100, // Amount in paisa
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
//   const data = new paymentModels({
//     paymentId:paymentId
//   })
//  data.save();
  if (!razorpay) {
    res.status(500).send("Razorpay object not initialized");
    return;
  }
  const instance = new razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
  });
  const payment = await instance.payments.fetch(paymentId);
  console.log(" const payment = ", payment);
  if (
    payment &&
    payment.order_id === orderId &&
    payment.status === "captured"
  ) {
    res.send("Payment successful");
  } else {
    res.status(400).send("Payment verification failed");
  }
};
module.exports = { initiate, capture_payment };
