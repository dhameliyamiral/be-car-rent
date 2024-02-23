const bookingModel = require("../models/bookingModel");
const bookingCancel = async (req, res) => {
  const { car_id, user_id } = req.body;
  try {
    date = new Date();
    const Booking = await bookingModel.findOne({
      car_id: car_id,
      user_id: user_id,
    });
    const result = await bookingModel.findOneAndUpdate(
      { _id: Booking.id },
      { $set: { deletedAt: date } }
    );
    if (!result) {
      res.json({ message: "documnet is not found" });
    }
    res.json({ message: "Documnet Deleted Successfully..!!" });
    // const find = await bookingModel.find();
    // console.log("find = ",find);
  } catch (error) {
    return res.json({ status: 500, message: "intrnal server error" });
  }
};
module.exports = { bookingCancel };