const ContactModel = require("../models/ContactModel")
const contactService = [];
contactService.create = async(param)=>{
    const data = await ContactModel.create(param).then(e=>e).catch(e=>e);
    return data;
}
module.exports=contactService