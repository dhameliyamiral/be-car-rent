const bookingModel = require("../models/bookingModel");
const viewBooking = async (req, res) => {
  try {
    const data = await bookingModel.find();
    return res.json({ status: 200, data: data });
  } catch (error) {
    return res.json({ status: 500, message: "intrnal server error" });
  }
};
module.exports = { viewBooking };
