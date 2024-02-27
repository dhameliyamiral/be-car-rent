const ProductInsertModel = require("../models/carsInsertModel")
const multer =require("multer");
const carUploadService=[];
const storage = multer.diskStorage({
    
    destination:(req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename:(req,file,cb)=>{
        const filename=`${Date.now()}-${file.originalname}`;
        cb(null,filename)
    }
})
carUploadService.create = async(param)=>{
    const data = await ProductInsertModel.create(param).then(e=>e).catch(e=>e);
    return data;
}
carUploadService.findOne=async(param)=>{
    const data = await ProductInsertModel.findOne(param).then(e=>e).catch(e=>e);
    return data;
}
const upload = multer({storage})
module.exports = {upload,carUploadService};



