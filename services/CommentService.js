const { addCommentsModels } = require("../models/CommentsModels");
const CommentService = []
CommentService.create = async(param)=>{
    const data = await addCommentsModels.create(param).then(e=>e).catch(e=>e);
    return data;
}
module.exports=CommentService;