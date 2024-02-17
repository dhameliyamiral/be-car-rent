const userModel = require("../models/userModel");
const authService = [];
authService.create = async(param)=>{
    const data = await userModel.create(param).then(e=>e).catch(e=>e);
    return data;
}
authService.findOne = async(param)=>{
    const data = await userModel.findOne(param).then(e=>e).catch(e=>e);
    return data;
}

module.exports = authService