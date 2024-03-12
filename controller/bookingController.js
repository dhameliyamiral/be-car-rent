const bookingModel = require("../models/bookingModel");
const carsInsertModel = require("../models/carsInsertModel");
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
  const [pickup_date, return_date] = date_time_range.split("-");
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
      pickup_date &&
      return_date &&
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
  if (!date_time_range) {
    console.error("date_time_range is undefined or null");
    return; // Exit the function or handle the error appropriately
  }

  const [pickup_date, return_date] = date_time_range.split("-");
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
  res.json({ status: 200, message: "Update booking Successfully...!", data });
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
const bookingdisplay = async (req, res) => {
  const { id: user_id } = req.userData;
  const bookingdata = await bookingModel.find({ user_id });
  console.log("data==", bookingdata);
  const carIds = bookingdata.map((booking) => booking.car_id);
  console.log("carIds = = ", carIds);
  let cardata = [];
  if (carIds.length > 0) {
    cardata = await carsInsertModel.find({ _id: { $in: carIds } });
  }
  const combined = {
    bookings: bookingdata,
    cars: cardata,
  };
  res.json(combined);
};
const searchbooking = async (req, res) => {
  const { date_time_range } = req.query;
  const [pickup_date, return_date] = date_time_range.split("-");
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
  const bookings = await bookingModel.find({
    // $or: [
    //   { pickup_date: { $gte: pickup_date, $lte: return_date } },
    //   { return_date: { $gte: pickup_date, $lte: return_date } },
    // ],
    $or: [
      { 
        $and: [
          { pickup_date: { $lte: pickup_date } }, 
          { return_date: { $gte: pickup_date } }
        ] 
      },
      { 
        $and: [
          { pickup_date: { $lte: return_date } }, 
          { return_date: { $gte: return_date  } }
        ] 
      },
      { 
        $and: [
          { pickup_date: { $gte: pickup_date, $lte: return_date  } }
        ] 
      }
    ]
  
  });
  const bookedCarIds = bookings.map((bookingModel) => bookingModel.car_id);
  const availableCars = await carsInsertModel.find({
    _id: { $nin: bookedCarIds },
  });
  res.json(availableCars);
};
module.exports = {
  bookinginsertApi,
  bookingUpdate,
  bookingCancel,
  bookingdisplay,
  searchbooking,
};
