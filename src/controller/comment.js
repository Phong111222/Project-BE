import asyncMiddleware from '../middlewares/asyncMiddleware';
import Comment from '../models/comment';
import Post from '../models/post';
import ErrorResponse from '../models/response/ErrorResponse';
const Edit = asyncMiddleware(async (req, res, next) => {
  const { text, PostID, userID } = req.body;
  const { id: commentID } = req.params;
  const check_comment = await Comment.findOne({ _id: commentID })
    .populate('user', 'name email')
    .populate('post', 'title text');
  console.log(check_comment);
  if (!check_comment) {
    return next(new ErrorResponse(400, 'Comment does not exist'));
  }
});

export default {
  Edit,
};
