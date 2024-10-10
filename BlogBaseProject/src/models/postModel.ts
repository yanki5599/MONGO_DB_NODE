import mongoose, { Schema, Document, Types } from "mongoose";

export interface IComment {
  content: string;
  author: Types.ObjectId;
  createdAt: Date;
}

export interface IPost extends Document {
  _id: Types.ObjectId;
  title: string;
  content: string;
  author: Types.ObjectId;
  comments: IComment[];
}

const CommentSchema = new Schema<IComment>({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostSchema = new Schema<IPost>({
  title: {
    type: String,
    minlength: [10, "Content must be at least 10 characters"],
    maxlength: [30, "Content cannot be longer than 30 characters"],
    required: true,
  },
  content: {
    type: String,
    minlength: [10, "Content must be at least 10 characters"],
    maxlength: [1000, "Content cannot be longer than 1000 characters"],
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [CommentSchema],
});

export default mongoose.model<IPost>("Post", PostSchema);
