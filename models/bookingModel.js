const mongoose = require('mongoose')
const bookingSchema = new mongoose.Schema({
    car:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'carsDetails',
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'carsDetails',
        required:true
    },
    
})
const bookingModel = mongoose.model("booking",bookingSchema);
module.exports = bookingModel;