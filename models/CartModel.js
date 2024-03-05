const mongoose = require("mongoose");
const carSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  items: [
    {
      car_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});
const CartModel = mongoose.model("Cart", carSchema);
module.exports = CartModel;
