const mongoose = require("mongoose");
const addCommentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true,
    }
})
const addCommentsModels = mongoose.model("Comment",addCommentSchema)
module.exports={addCommentsModels}