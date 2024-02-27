const mongooes = require("mongoose");
const ProductInsertSchema = new mongooes.Schema({
   plate_number: {
    type: String,
    unique: true,
    required: true,
  },
  Image:{
    type:String
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mileage: {
    type: String,
    required: true,
  },
  Air_Conditioning_Availability: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  luggage: {
    type: String,
    required: true,
  },
  fuel: {
    type: String,
    required: true,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});
const carsInsertModel = mongooes.model("carsDetails", ProductInsertSchema);
module.exports = carsInsertModel;
