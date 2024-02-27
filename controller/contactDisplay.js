const {ContactModel} = require('../models/ContactModel')
const contactDisplay = async(req,res)=>{
    const data = await ContactModel.find();
    res.json({status:200,message:{data}})
}
module.exports = {contactDisplay}



