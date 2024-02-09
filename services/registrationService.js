const registrationModel = require("../models/registrationModel");
const userService = [];
userService.create = async(param)=>{
    const data = await registrationModel.create(param).then(e=>e).catch(e=>e);
    return data;
}
module.exports = userService


