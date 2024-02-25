const ProductInsertModel = require("../models/ProductInsertModel");
const {carUploadService} = require("../services/carUploadService");
const ProductUpdateController = async (req,res)=>{
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
        brand
      } = req.body;
      const product = await carUploadService.findOne({
        plate_number:plate_number,
      });

      console.log("product == ",product);
      await ProductInsertModel.findByIdAndUpdate(
        {_id:product.id},
        {
            $set:{
                model,
                price,
                description,
                mileage,
                transmission,
                seats,
                luggage,
                fuel,
                brand
            },
        }
      );
      res.json({status:200,message:"Update Product Successfully..!"})
}
module.exports = { ProductUpdateController }

