import { Schema, model } from 'mongoose';

const CommentSchema = Schema(
  {
    text: {
      type: String,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'post',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
  }
);

export default model('comment', CommentSchema);
