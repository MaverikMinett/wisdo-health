import { ICreatePostParams, ICreatePostResponse } from "../interfaces/IPost";
import { Post } from "../models/post.model";

export const createPost = async (postParams: ICreatePostParams): Promise<ICreatePostResponse> => {
  const post = new Post(postParams);
  await post.save();
  return { _id: post._id };
}
