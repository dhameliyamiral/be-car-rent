const carsInsertModel = require("../models/carsInsertModel");
const bookingModel = require("../models/bookingModel");
const { carUploadService } = require("../services/carUploadService");
const path = require("path");
const tempPath = path.join(__dirname, "./../uploads");
console.log("temp = path === ", tempPath);
const carsInsertController = async (req, res) => {
  const {
    plate_number,
    model,
    Image,
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
    brand &&
    Image
  ) {
    if (!["petrol", "diesel", "cng"].includes(fuel.toLowerCase())) {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid fuel type" });
    }
    try {
      const data = new carsInsertModel({
        plate_number: plate_number,
        Image: Image,
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
      console.log(error);
      return res.json({ status: 500, message: "intrnal server error" });
    }
  } else {
    return res.json({ status: 400, message: "all field are required" });
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
    Image,
  } = req.body;
  try {
    const product = await carUploadService.findOne({
      plate_number: plate_number,
    });

    await carsInsertModel.findByIdAndUpdate(
      { _id: product.id },
      {
        $set: {
          model,
          price,
          Image,
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
    const { fuel, price, brand, seats } = req.query;
    const filter = {};
    if (fuel) {
      filter.fuel = fuel;
    }
    if (seats) {
      filter.seats = seats;
    }
    if (price) {
      const [minPrice, maxPrice] = price.split("-");
      filter.price = { $gte: minPrice, $lte: maxPrice };
    }
    if (brand) {
      filter.brand = brand;
    }
    let query = carsInsertModel.find({ deletedAt: null });
    if (Object.keys(filter).length > 0) {
      query = query.where(filter);
    }
    const products = await query.exec();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
//const carimageapi = (req, res) => {
//     try {
//       const imageName = req.params.imageName

//       res.sendFile(tempPath + '/' + imageName);

//     }  catch(error) {
//       res.send({error})
//     }
//}
const addcarscart = async (req, res) => {
  const { car_id } = req.body;
  const { id: user_id } = req.userData;
  console.log("user_id = ", user_id);
  let cart = await CartModel.findOne({ user_id });
  if (!cart) {
    cart = new CartModel({ user_id, items: [] });
  }
  cart.items.push({ car_id });
  await cart.save();
  const itemCount = cart.items.length;
  res.json({
    success: true,
    message: "Car added to cart successfully.",
    itemCount,
  });
};
const displayCart = async (req, res) => {
  const { id: user_id } = req.userData;
  const Cartdata = await CartModel.find({ user_id });
  res.json(Cartdata);
};
const carsfilter = async (req, res) => {
  const { date_time_range, pickup_Location, dropoff_Location } = req.body;
  if (date_time_range && pickup_Location && dropoff_Location) {
    let [pickupDate, returnDate] = date_time_range.split("-");

    let [day, month, year] = pickupDate.split("/");
    pickupDate = new Date(`${year}-${month}-${day}`);

    let [return_dateday, return_datemonth, return_dateyear] =
      returnDate.split("/");
    returnDate = new Date(
      `${return_dateyear}-${return_datemonth}-${return_dateday}`
    );
    if (pickupDate < returnDate) {
      const carlist = await carsInsertModel.aggregate([
        {
          $lookup: {
            from: "bookings",
            localField: "_id",
            foreignField: "car_id",
            as: "booking",
          },
        },
        {
          $unwind: {
            path: "$booking",
            includeArrayIndex: "string",
          },
        },
        {
          $addFields: {
            booking_pickup_date: "$booking.pickup_date",
            booking_return_date: "$booking.return_date",
          },
        },
        {
          $project: {
            booking: 0,
            __v: 0,
          },
        },
        {
          $addFields: {
            pickupDate: pickupDate,
            returnDate: returnDate,
          },
        },
        {
          $addFields: {
            isBooked: {
              $cond: {
                if: {
                  $or: [
                    {
                      $and: [
                        { $lte: ["$booking_pickup_date", "$pickupDate"] },
                        { $gte: ["$booking_return_date", "$pickupDate"] },
                      ],
                    },
                    {
                      $and: [
                        { $lte: ["$booking_pickup_date", "$returnDate"] },
                        { $gte: ["$booking_return_date", "$returnDate"] },
                      ],
                    },
                  ],
                },
                then: "BOOKED",
                else: "NO_BOOKED",
              },
            },
          },
        },
        {
          $match: {
            isBooked: "NO_BOOKED",
          },
        },
        {
          $project: {
            isBooked: 0,
            booking_pickup_date: 0,
            booking_return_date: 0,
            deletedAt: 0,
            updatedAt: 0,
            pickupDate: 0,
            returnDate: 0,
          },
        },
      ]);

      return res.json({
        carlist,
      });
    } else {
      return res.json({
        status: 400,
        message: "Bad Request",
      });
    }
  } else {
    res.json({ status: 400, message: "all field are required" });
  }
};
module.exports = {
  carsInsertController,
  carsDeleteController,
  carsUpdateController,
  carsDisplayController,
  addcarscart,
  carsfilter,
  displayCart,
};
