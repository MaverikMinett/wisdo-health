import { Auth } from "../../interfaces/Auth";
import { ICreatePostParams, INewPostParams } from "../../interfaces/IPost";
import { HttpException } from "../../exceptions/http-exception";
import { findCommunityByTitle } from "../../repo/community.repo";
import { DEFAULT_POST_SUMMARY_LENGTH_IN_WORDS, POST_LENGTH_WEIGHT } from "../../constants";
import { ICommunity } from "../../interfaces/ICommunity";
import { createPost } from "../../repo/post.repo";

export const newPost = async (auth: Auth, params: INewPostParams) => {

  const community: ICommunity = await findCommunityByTitle(params.community);

  if (! community) {
    throw new HttpException(400, 'Community does not exist');
  }

  if (! auth.user.communities.find(communityId => communityId.toString() === community._id.toString())) {
    throw new HttpException(403, 'You do not have permission to post to this community');
  }

  const bodyWords = params.body.split(' ');
  const bodyLength = bodyWords.length;

  if (! params.summary || params.summary.match(/^\s+$/)) {
    params.summary = bodyLength > DEFAULT_POST_SUMMARY_LENGTH_IN_WORDS
      ? bodyWords.slice(0,DEFAULT_POST_SUMMARY_LENGTH_IN_WORDS).join(' ')
      : params.body;
  }

  const createPostParams: ICreatePostParams = {
    title: params.title,
    summary: params.summary,
    body: params.body,
    bodyLength: bodyLength,
    author: auth.user._id,
    community: community._id,
    weight: params.body.length * POST_LENGTH_WEIGHT
  };

  return createPost(createPostParams);
}