const blogModel = require("../models/blogModel");
const createBlog = async (req,res)=>{
const {
Image,
details,
heding
} = req.body;
if(Image&&details&&heding){
    try {
        const data = new blogModel({
            Image:Image,
            details:details,
            heding:heding
        })
        await data.save();
        return res.json({
            status: 200,
            message: "Insert Data Succesfully..!!",
            data: data,
          });
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, message: "intrnal server error" });
    }

}
else
{
    return res.json({ status: 200, message: "all field are required" });
}
}
const deleteBlog = async(req,res)=>{
    try {
        const { bloag_id } = req.body;
        date = new Date();
        const product = await blogModel.findOne({
          _id: bloag_id,
        });
        const result = await blogModel.findOneAndUpdate(
          { _id: product.id },
          { $set: { deletedAt: date } }
        );
        if (!result) {
          res.json({ message: "documnet is not found" });
        }
        res.json({ message: "Documnet Deleted Successfully..!!" });
      } catch (error) {
        console.log(error);
        return res.json({ status: 500, message: "intrnal server error" });
      }
}
const UpdateBlogController = async (req, res) => {
    const {
        bloag_id,
        details,
        heding,
        Image
    } = req.body;
    try {
      const product = await blogModel.findOne({
        _id: bloag_id,
      });
  
      await blogModel.findByIdAndUpdate(
        { _id: product.id },
        {
          $set: {
            bloag_id,
            details,
            heding,
            Image
          },
        }
      );
      res.json({ status: 200, message: "Update Product Successfully..!" });
    } catch (error) {
      return res.json({ status: 500, message: "intrnal server error" });
    }
};
module.exports = {createBlog,deleteBlog,UpdateBlogController}