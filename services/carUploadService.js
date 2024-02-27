const carsInsertModel = require("../models/carsInsertModel")
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
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only JPG, JPEG, and PNG files are allowed'), false); // Reject the file
    }
};
carUploadService.create = async(param)=>{
    const data = await carsInsertModel.create(param).then(e=>e).catch(e=>e);
    return data;
}
carUploadService.findOne=async(param)=>{
    const data = await carsInsertModel.findOne(param).then(e=>e).catch(e=>e);
    return data;
}
const upload = multer({storage,fileFilter})
module.exports = {carUploadService,upload}; 