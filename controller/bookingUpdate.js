const bookingModel = require("../models/bookingModel")
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
module.exports = { bookingUpdate };


