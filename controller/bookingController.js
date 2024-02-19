const bookingModel = require("../models/bookingModel");
const bookingController = async (req, res) => {
  const {
    car_id,
    user_id,
    pickup_Location,
    dropoff_Location,
    pickup_date,
    return_date,
    pickup_time,
    return_time,
  } = req.body;
  try {
    const data = new bookingModel({
        car_id,
        user_id,
        pickup_Location,
        dropoff_Location,
        pickup_date,
        return_date,
        pickup_time,
        return_time,
      });
      await data.save();
      res.status(201).json({ message: 'Booking created successfully', data});
  } catch (error) {
    return res.json({status:500,message:"internal server error"})
  }

};
module.exports = { bookingController };
// https://chat.openai.com/share/ce8c028f-2bac-4191-afae-b3da1945bfe0
