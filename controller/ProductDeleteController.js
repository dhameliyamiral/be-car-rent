const ProductInsertModel = require("../models/ProductInsertModel");
const carUploadService = require("../services/carUploadService");
const ProductDeleteController = async(req,res)=>{
    try {
        const {plate_number} =req.body;
        date = new Date()
        const product = await carUploadService.findOne(
            {plate_number:plate_number}
        );
        const result = await ProductInsertModel.findOneAndUpdate(
           {_id:product.id},
            {$set:{deletedAt : date }}
        )
        if(!result){
            res.json({ message: "documnet is not found" });
        }
        res.json({ message: "documnet is soft deleted..!!" });
    } catch (error) {
        return res.json({ status: 500,
            message: "intrnal server error",})
    }
        // const data = await ProductInsertModel.find({ deletedAt: null });
        // console.log("data = ",data);
}
module.exports={
    ProductDeleteController
}