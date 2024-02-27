const bookingModel = require("../models/bookingModel");
const bookingService = require("../services/bookingService");
const bookinginsertApi = async (req, res) => {
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
const bookingUpdate = async (req, res) => {
  const {
    car_id,
    pickup_Location,
    dropoff_Location,
    pickup_date,
    return_date,
    pickup_time,
    return_time,
  } = req.body;

  const { id: user_id } = req.userData;
  console.log("user id = ",user_id );
  const user = await bookingModel.findOne({
    user_id: user_id,
  });
  console.log("user_id", user);
  await bookingModel.findByIdAndUpdate(
    {
      _id:user._id,
    },
    {
      $set: {
        car_id,
        pickup_Location,
        dropoff_Location,
        pickup_date,
        return_date,
        pickup_time,
        return_time,
      },
    }
  );
  res.json({ status: 200, message: "Update booking Successfully...!" });
};
const bookingCancel = async (req, res) => {
  const { car_id } = req.body;
  try {
    const {id:user_id} = req.userData;
    date = new Date();
    const Booking = await bookingModel.findOne({
      car_id: car_id,
      user_id: user_id,
    });
    await bookingModel.findOneAndUpdate(
      { _id: Booking.id },
      { $set: { deletedAt: date } }
    );
    res.json({ message: "Documnet Deleted Successfully..!!" });
    // const find = await bookingModel.find();
    // console.log("find = ",find);
  } catch (error) {
    return res.json({ status: 500, message: "intrnal server error" });
  }
};
module.exports = { bookinginsertApi, bookingUpdate,bookingCancel};
// https://chat.openai.com/share/ce8c028f-2bac-4191-afae-b3da1945bfe0