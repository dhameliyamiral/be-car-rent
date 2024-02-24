const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  car_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carsDetails",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "registrations",
    required: true,
  },
  pickup_Location: {
    type: String,
    required: true,
  },
  dropoff_Location: {
    type: String,
    required: true,
  },
  pickup_date: {
    type: Date,
    required: true,
  },
  return_date: {
    type: Date,
    required: true,
  },
  pickup_time:{
    type:String,
    required:true,
  },
  return_time:{
    type:String,
    required:true,
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
  last_update_date: {
    type: Date,
    default:null,
  },
  deletedAt: {
    type: Date,
    default: null,
  }
});
const bookingModel = mongoose.model("Booking", bookingSchema);
module.exports = bookingModel;
