const ProductInsertModel = require("../models/ProductInsertModel");
const {carUploadService} = require("../services/carUploadService");
const ProductInsertController = async (req, res) => {
  const {
    plate_number,
    model,
    price,
    description,
    mileage,
    transmission,
    seats,
    luggage,
    fuel,
    brand,
  } = req.body;
  if (
    plate_number &&
    model &&
    price &&
    description &&
    mileage &&
    transmission &&
    seats &&
    luggage &&
    fuel &&
    brand
  ) {
    // try {
      const data = new ProductInsertModel({
        plate_number: plate_number,
        Image: req.file.filename,
        brand: brand,
        model: model,
        price: price,
        description: description,
        mileage: mileage,
        transmission: transmission,
        seats: seats,
        luggage: luggage,
        fuel: fuel,
      });
      carUploadService.create(data).then((data) => {
        return res.json({
          status: 200,
          message: "Insert Data Succesfully..!!",
          data: data,
        });
      });
    // } catch (error) {
    //   return res.json({ status: 500, message: "intrnal server error" });
    // }
  } else {
    return res.json({ status: 200, message: "all field are required" });
  }
};
module.exports = { ProductInsertController };