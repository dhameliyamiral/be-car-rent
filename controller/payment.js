const paymentModels = require('../models/paymentmodel')
const razorpay = require('razorpay');
const instance = new razorpay({
    key_id: 'rzp_test_q2Yzi6jM62f8Qq',
    key_secret: 'fmO1KCB29zrDA5wbxGvsK0gq',
  });
  
const initiate = async(req,res)=>{
    const {amount,currency}=req.body;
    const order = await instance.orders.create({
        amount: amount * 100, // Amount in paisa
        currency: currency,
      });
      const Payment = new paymentModels({
        orderId: order.id,
        amount: amount,
        currency: currency,
        status: 'pending',
      })
      await Payment.save();
      res.json({ orderId: order.id, amount: order.amount });
}
const capture_payment = async(req,res)=>{
  const {paymentId,orderId} = req.body;
}
module.exports = {initiate,capture_payment}