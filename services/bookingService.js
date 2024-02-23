const bookingModel = require("../models/bookingModel");
const bookingService = []
bookingService.create = async(param)=>{
    const data = await bookingModel.create(param).then(e=>e).catch(e=>e);
    return data;
}
module.exports =  bookingService