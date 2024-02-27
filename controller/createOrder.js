// const razorpay = require('razorpay');
// const dotenv = require('dotenv');
// dotenv.config()

// const razorpayInstance = new razorpay({
//     key_id: process.env.key_id,
//     key_secret:process.env.key_secret,
//   });

// const createOrder = async(req,res)=>{
//     const {amount,currency,receipt, notes}  = req.body;      
//     razorpayInstance.orders.create({amount, currency, receipt, notes},  
//         (err, order)=>{  
//           if(!err) 
//             res.json(order) 
//           else
//             res.send(err); 
//         } 
//     ) 
// }
// module.exports = {createOrder}