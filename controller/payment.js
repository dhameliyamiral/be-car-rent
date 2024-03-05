const paymentModels = require("../models/paymentmodel");
const razorpay = require("razorpay");
const initiate = async (req, res) => {
  const { amount, currency } = req.body;
  const instance = new razorpay({ key_id: 'rzp_test_uMBPSWkRpGIaQF', key_secret: 'jSuZcKyxmpuWEhCwhQ2hs5MQ' })
  instance.orders.create({
    amount: amount * 100, // Amount in paisa
    currency: currency
  }).then(order =>{
    const payment = new paymentModels({
      orderId: order.id,
      amount: amount,
      currency: currency,
      status: "pending"
    });
     return payment.save();
  })
  .then(savedPayment => {
    res.json({ message: "order created", data: savedPayment });
  })
  .catch(error => {
    console.error("Error occurred during order creation:", error);
    res.status(500).json({ error: "Internal server error" });
  });
};
// const capture_payment = async (req, res) => {
//   const { paymentId, orderId } = req.body;
//   try {
//     const payment = await paymentModels.findOne({ orderId: orderId });
//     console.log("payment = ", payment);
//     if (!payment) {
//       return res.status(404).send("Payment not found");
//     }
//     const capturedPayment = await razorpay.payments.capture(
//       paymentId,
//       payment.amount,
//       "INR"
//     );
//     payment.status = "success";
//     const data = await paymentModels.save();
//     console.log("data ==", data);
//     res.json(capturedPayment);
//   } catch (error) {
//     console.error("Error occurred during payment capture:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
 
// };
module.exports = { initiate };
