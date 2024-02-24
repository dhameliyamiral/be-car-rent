const bookingModel = require("../models/bookingModel");

const bookingService = require("../services/bookingService");
const bookingController = async (req, res) => {
  const {
    car_id,
    pickup_Location,
    dropoff_Location,
    pickup_date,
    return_date,
    pickup_time,
    return_time,
  } = req.body;
  try {
    const { id: user_id } = req.userData;
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
    bookingService.create(data).then((data) => {
      res.status(200).json({ message: "Booking Successfully..!!", data });
    });
  } catch (error) {
    return res.json({ status: 500, message: "internal server error" });
  }
};
module.exports = { bookingController };
// https://chat.openai.com/share/ce8c028f-2bac-4191-afae-b3da1945bfe0
