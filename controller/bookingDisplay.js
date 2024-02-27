const bookingModel = require("../models/bookingModel");
const userModel = require("../models/userModel");
const bookingDisplay = async (req,res)=>{
const users =  await userModel.find();
const bookingHistory = {};
for(user of users){
    const userBookings = await bookingModel.find({user_id:user_id})
    bookingHistory[user.email] = userBookings
}
res.render('admin-booking-history', { bookingHistory });

}
module.exports={bookingDisplay}