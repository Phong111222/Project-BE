import { Schema, model } from 'mongoose';

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    maxLength: [20, 'Title must have letters shorter than 20  '],
  },
  text: {
    type: String,
    required: true,
    minlength: [10, 'Text must have at least 10 characters'],
  },
  like: {
    type: [Schema.Types.ObjectId],
    ref: 'user',
  },
  comment: {
    type: [Schema.Types.ObjectId],
    ref: 'comment',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

const Post = model('post', PostSchema);

export default Post;
