const registrationModel = require("../models/registrationModel");
const ProductInsertModel = require("../models/ProductInsertModel");
const authService = [];
authService.create = async(param)=>{
    const data = await registrationModel.create(param).then(e=>e).catch(e=>e);
    return data;
}
authService.findOne = async(param)=>{
    const data = await registrationModel.findOne(param).then(e=>e).catch(e=>e);
    return data;
}
authService.create = async(param)=>{
    const data = await ProductInsertModel.create(param).then(e=>e).catch(e=>e);
    return data;
}

module.exports = authService