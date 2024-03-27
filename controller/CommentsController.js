const { addCommentsModels } = require("../models/CommentsModels");
const CommentService = require("../services/CommentService");
const CommentsController = async (req, res) => {
  const { name, email, message } = req.body;
  if (name && email && message) {
    const data = new addCommentsModels({
      name,
      email,
      message,
    });
    CommentService.create(data).then((data) => {
      res.status(200).json({ message: "Comment successfully added!", data });
    });
  } else {
    res.json({
      status: 200,
      message: "all filed are required",
    });
  }
};
const displaycommentController = async (req, res) => {
  const data = await addCommentsModels.find();
  res.send({ data: data });
};
const deleteCommentController = async (req, res) => {
  const { comment_id } = req.body;
  try {
    const deletedRecord = await addCommentsModels.findByIdAndDelete(comment_id);

    if (!deletedRecord) {
      return res
        .status(404)
        .send("The record with the given ID was not found.");
    }

    res.send("Record deleted successfully");
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, message: "intrnal server error" });
  }
};
module.exports = { CommentsController, displaycommentController,deleteCommentController };
