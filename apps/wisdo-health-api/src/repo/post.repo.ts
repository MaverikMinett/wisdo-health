import { Types } from "mongoose";
import { ICreatePostParams, ICreatePostResponse, IFeedPostDocument } from "../interfaces/IPost";
import { Post } from "../models/post.model";
import { PostStatus } from "../enums/post-status.enum";

export const createPost = async (postParams: ICreatePostParams): Promise<ICreatePostResponse> => {
  const post = new Post(postParams);
  await post.save();
  return { _id: post._id };
}

export const findFeedPosts = async(communityIds: Types.ObjectId[]) => {
  return Post
    .find({ status: PostStatus.Active, community: { $in: communityIds } })
    .populate('author',['name','country','image'])
    .populate('community',['title','image']) as Promise<IFeedPostDocument[]>
}