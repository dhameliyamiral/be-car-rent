const registrationModel = require("../models/registrationModel");

const authService = [];
authService.create = async(param)=>{
    const data = await registrationModel.create(param).then(e=>e).catch(e=>e);
    return data;
}
authService.findOne = async(param)=>{
    const data = await registrationModel.findOne(param).then(e=>e).catch(e=>e);
    return data;
}

module.exports = authService