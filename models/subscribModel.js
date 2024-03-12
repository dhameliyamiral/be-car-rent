const mongoose = require("mongoose")
const subscribSchema = new mongoose.Schema({
    email:String
});
const subscribModel = mongoose.model("subsctibation",subscribSchema)
module.exports = subscribModel