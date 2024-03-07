const { addCommentsModels } = require("../models/CommentsModels");
const CommentService =require("../services/CommentService");
const CommentsController = async (req, res) => {
  const { name, email, message } = req.body;
  if (name && email && message) {
    const data = new  addCommentsModels({
        name, email, message 
    })
    CommentService.create(data).then((data)=>{
        res.status(200).json({ message: "Comment successfully added!", data });
    });
  } else {
    res.json({
      status: 200,
      message: "all filed are required",
    });
  }
};
module.exports={CommentsController}