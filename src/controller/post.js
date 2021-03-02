import SuccessResponse from '../../../Selling-project/models/response/success';
import asyncMiddleware from '../middlewares/asyncMiddleware';
import Post from '../models/post';
import ErrorResponse from '../models/response/ErrorResponse';
import Comment from '../models/comment';
const Create = asyncMiddleware(async (req, res, next) => {
  const { text, userID, title } = req.body;
  const post = new Post({ title, text, user: userID });
  const rs = await post.save();
  res.status(200).json(new SuccessResponse(200, rs));
});

const GetPosts = asyncMiddleware(async (req, res, next) => {
  const posts = await Post.find().populate('user');
  res.status(200).json(new SuccessResponse(200, posts));
});

const Delete = asyncMiddleware(async (req, res, next) => {
  const { id: postID } = req.params;
  const { userID } = req.body;

  const post = await Post.findOne({ _id: postID });
  if (!post) {
    return next(new ErrorResponse(400, 'Post does not exist'));
  }
  if (!(userID === post.user.toString())) {
    return next(ErrorResponse(401, 'user can not delete the post'));
  }
  const rs = await post.remove();

  res.status(200).json(new SuccessResponse(200, rs));
});

const Edit = asyncMiddleware(async (req, res, next) => {
  const { text, title, userID } = req.body;
  const { id: postID } = req.params;

  const post = await Post.findOne({ _id: postID });

  if (!post) {
    return next(new ErrorResponse(400, 'Post does not exist'));
  }
  if (!(userID === post.user.toString())) {
    return next(new ErrorResponse(401, 'user can not edit the post'));
  }
  post.text = text;
  post.title = title;
  const rs = await post.save();
  res.status(200).json(new SuccessResponse(200, rs));
});

const Like = asyncMiddleware(async (req, res, next) => {
  const { id: PostID } = req.params;
  const { userID } = req.body;
  const post = await Post.findOne({ _id: PostID });
  if (!post) {
    return next(new ErrorResponse(400, 'post does not exist'));
  }
  post.like.push(userID);
  const rs = await post.save();
  res.status(200).json(new SuccessResponse(200, rs));
});

const CreateComment = asyncMiddleware(async (req, res, next) => {
  const { comment: user_comment, userID: user } = req.body;
  const { id: PostID } = req.params;
  const check_post = await Post.findOne({ _id: PostID });
  if (!check_post) return next(new ErrorResponse(400, 'Post does not exist'));
  const comment = new Comment({
    text: user_comment,
    post: PostID,
    user,
  });
  const save_comment = await comment.save();
  check_post.comment.push(save_comment._id);
  const save_post_comment = await check_post.save();
  return res.status(200).json(200, { save_comment, save_post_comment });
});

export default {
  Create,
  GetPosts,
  Delete,
  Edit,
  Like,
  CreateComment,
};
