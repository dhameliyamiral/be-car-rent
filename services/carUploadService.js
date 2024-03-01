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
    console.log("fileFilter");
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only JPG, JPEG, and PNG files are allowed'), false); // Reject the file
    }
};
const upload = multer({storage,fileFilter})
carUploadService.create = async(param)=>{
    console.log("service");
    const data = await carsInsertModel.create(param).then(e=>e).catch(e=>e);
    return data;
}
carUploadService.findOne=async(param)=>{
    const data = await carsInsertModel.findOne(param).then(e=>e).catch(e=>e);
    return data;
}

module.exports = {carUploadService,upload}; 