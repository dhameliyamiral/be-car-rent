const mongoose = require("mongoose")
const subscribSchema = new mongoose.Schema({
    email:String
},{ timestamps: true });
const subscribModel = mongoose.model("subsctibation",subscribSchema)
module.exports = subscribModel