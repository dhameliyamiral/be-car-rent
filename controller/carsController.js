const carsInsertModel = require("../models/carsInsertModel");
const { carUploadService } = require("../services/carUploadService");
const carsInsertController = async (req, res) => {
  const {
    plate_number,
    model,
    price,
    description,
    mileage,
    Air_Conditioning_Availability,
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
    Air_Conditioning_Availability &&
    seats &&
    luggage &&
    fuel &&
    brand
  ) {
    try {
      const data = new carsInsertModel({
        plate_number: plate_number,
        Image: req.file.filename,
        brand: brand,
        model: model,
        price: price,
        description: description,
        mileage: mileage,
        Air_Conditioning_Availability: Air_Conditioning_Availability,
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
    } catch (error) {
      return res.json({ status: 500, message: "intrnal server error" });
    }
  } else {
    return res.json({ status: 200, message: "all field are required" });
  }
};

const carsDeleteController = async (req, res) => {
  try {
    const { plate_number } = req.body;
    date = new Date();
    const product = await carUploadService.findOne({
      plate_number: plate_number,
    });
    const result = await carsInsertModel.findOneAndUpdate(
      { _id: product.id },
      { $set: { deletedAt: date } }
    );
    if (!result) {
      res.json({ message: "documnet is not found" });
    }
    res.json({ message: "Documnet Deleted Successfully..!!" });
  } catch (error) {
    return res.json({ status: 500, message: "intrnal server error" });
  }
  // const data = await ProductInsertModel.find({ deletedAt: null });
  // console.log("data = ",data);
};
const carsUpdateController = async (req, res) => {
  const {
    plate_number,
    model,
    price,
    description,
    mileage,
    Air_Conditioning_Availability,
    seats,
    luggage,
    fuel,
    brand,
  } = req.body;
  try {
    const product = await carUploadService.findOne({
      plate_number: plate_number,
    });

    console.log("product == ", product);
    await carsInsertModel.findByIdAndUpdate(
      { _id: product.id },
      {
        $set: {
          model,
          price,
          description,
          mileage,
          Air_Conditioning_Availability,
          seats,
          luggage,
          fuel,
          brand,
        },
      }
    );
    res.json({ status: 200, message: "Update Product Successfully..!" });
  } catch (error) {
    return res.json({ status: 500, message: "intrnal server error" });
  }
};

const carsDisplayController = async (req, res) => {
  try {
    const data = await carsInsertModel.find({ deletedAt: null });
    return res.json({ status: 200, data: data });
    // console.log("data = ", data);
  } catch (error) {
    return res.json({ status: 500, message: "intrenal server error" });
  }
};
module.exports = {
  carsInsertController,
  carsDeleteController,
  carsUpdateController,
  carsDisplayController,
};
