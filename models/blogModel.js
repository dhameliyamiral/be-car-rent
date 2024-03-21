const mongoose = require("mongoose")
const blogSchema = new mongoose.Schema({
    Image:{
        type:String,
        required:true,
    },
    details:{
        type:String,
        required:true,
    },
    heding:{
        type:String,
        required:true,
    },
    deletedAt: {
        type: Date,
        default: null,
      }
},{ timestamps: true });
const blogModel = mongoose.model("blogDetails",blogSchema);
module.exports = blogModel;