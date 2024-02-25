const bookingModel = require("../models/bookingModel");
const userModel = require("../models/userModel");
const bookingDisplay = async (req,res)=>{
    // try {
    //     const booking = await bookingModel.find();
    //     const user = await userModel.findOne(booking.user_id)
    //     // console.log("id == = =",booking.user_id);
    //     const email = user.email
    //     res.json({status:200,message:"booking history",booking,email})
    // } catch (error) {
    //     res.status(500).send('Internal server error');
    // }
const users =  await userModel.find();
const bookingHistory = {};
for(user of users){
    const userBookings = await bookingModel.find({user_id:user_id})
    bookingHistory[user.email] = userBookings
}
res.render('admin-booking-history', { bookingHistory });

}
module.exports={bookingDisplay}