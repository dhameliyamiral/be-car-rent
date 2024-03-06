const bookingModel = require("../models/bookingModel");
const bookingService = require("../services/bookingService");
const moment = require("moment");
const bookinginsertApi = async (req, res) => {
  const {
    car_id,
    pickup_Location,
    dropoff_Location,
    date_time_range,
    pickup_time,
    return_time,
  } = req.body;
  const [pickup_date, return_date] = date_time_range.split('-');
  const dateFormat = "YYYY-MM-DD";
  const currentDate = moment().startOf("day");
  if (
    moment(pickup_date, dateFormat) < currentDate ||
    moment(return_date, dateFormat) < currentDate
  ) {
    return res.json({ message: "Dates should be in the future" });
  }
  if (moment(return_date, dateFormat) <= moment(pickup_date, dateFormat)) {
    return res.json({ message: "Return date should be after pickup date" });
  }
  try {
    if (
      car_id &&
      pickup_Location &&
      dropoff_Location &&
      pickup_date&&
      return_date&&
      pickup_time &&
      return_time
    ) {
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
    } else {
      return res.json({
        status: 200,
        message: "all filed are required",
      });
    }
  } catch (error) {
    return res.json({ status: 500, message: "internal server error" });
  }
};
const bookingUpdate = async (req, res) => {
  const {
    car_id,
    pickup_Location,
    dropoff_Location,
    date_time_range,
    pickup_time,
    return_time,
  } = req.body;
  const [pickup_date, return_date] = date_time_range.split('-');
  const dateFormat = "YYYY-MM-DD";
  const currentDate = moment().startOf("day");
  console.log("current date = ", currentDate);
  if (
    moment(pickup_date, dateFormat) < currentDate ||
    moment(return_date, dateFormat) < currentDate
  ) {
    return res.json({ message: "Dates should be in the future" });
  }
  if (moment(return_date, dateFormat) <= moment(pickup_date, dateFormat)) {
    return res.json({ message: "Return date should be after pickup date" });
  }

  const { id: user_id } = req.userData;
  console.log("user id = ", user_id);
  const user = await bookingModel.findOne({
    user_id: user_id,
  });
  console.log("user_id", user);
  const data = await bookingModel.findByIdAndUpdate(
    {
      _id: user._id,
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
  res.json({ status: 200, message: "Update booking Successfully...!" ,data});
};
const bookingCancel = async (req, res) => {
  const { car_id } = req.body;
  try {
    const { id: user_id } = req.userData;
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
const bookingdisplay = async(req,res)=>{
const data = await bookingModel.find();
res.send({data:data})
}
module.exports = { bookinginsertApi, bookingUpdate, bookingCancel,bookingdisplay };
// https://chat.openai.com/share/ce8c028f-2bac-4191-afae-b3da1945bfe0
