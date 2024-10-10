import PostModel, { IComment, IPost } from "../models/postModel";
import statusCode from "../models/errorStatusConstants";
import userModel from "../models/userModel";
import { ErrorWithStatusCode } from "../models/errorTypes";
import { stat } from "fs";

export const createPost = async (post: IPost): Promise<IPost> => {
  const user = await userModel.findById(post.author);
  if (!user) throw new Error("User not found");

  const created = await PostModel.create(post);
  user.posts.push(created._id);
  await user.save();
  return created;
};
export const getPosts = async (): Promise<IPost[]> => {
  const posts = await PostModel.find().populate("author");
  return posts;
};
export const getPost = async (postId: string): Promise<IPost> => {
  const post = await PostModel.findById(postId);
  if (!post)
    throw new ErrorWithStatusCode("Post not found", statusCode.NOT_FOUND);

  return await (
    await post.populate("author")
  ).populate({ path: "comments.author", select: "username" });
};
export const updatePost = async (
  postId: string,
  post: IPost
): Promise<IPost> => {
  const updated = await PostModel.findByIdAndUpdate(postId, post, {
    new: true,
  });
  if (!updated) throw new Error("Post not found");
  return await updated.populate("author");
};
export const deletePost = async (postId: string): Promise<IPost> => {
  const deleted = await PostModel.findByIdAndDelete(postId);
  if (!deleted) throw new Error("Post not found");
  // delete the post from the user's posts array
  await userModel
    .findByIdAndUpdate(deleted.author, { $pull: { posts: deleted._id } })
    .orFail(new ErrorWithStatusCode("User not found", statusCode.NOT_FOUND));

  return deleted;
};
export const addComment = async (
  postId: string,
  comment: IComment
): Promise<IComment> => {
  await userModel
    .findById(comment.author)
    .orFail(new ErrorWithStatusCode("Author not found", statusCode.NOT_FOUND));

  const post = await PostModel.findByIdAndUpdate(
    postId,
    { $push: { comments: comment } },
    { new: true }
  ).orFail(new ErrorWithStatusCode("Post not found", statusCode.NOT_FOUND));
  console.log(post);

  return comment;
};
