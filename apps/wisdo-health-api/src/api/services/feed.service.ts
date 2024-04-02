import { Types } from "mongoose";
import { Auth } from "../../interfaces/Auth";
import { findFeedPosts } from "../../repo/post.repo";
import { IFeedPost } from "../../interfaces/IPost";

export const getFeed = async(auth: Auth): Promise<IFeedPost[]> => {

  const communityIds: Types.ObjectId[] = auth.user.communities
  let posts = await findFeedPosts(communityIds);

  posts = posts.sort( (a,b) => {
    return (b.author.country === auth.user.country ? 1 : 0) - (a.author.country === auth.user.country ? 1 : 0)
    || b.weight - a.weight;
  })

  const feedPosts: IFeedPost[] = posts.map( doc => {
    return {
      _id: doc._id,
      title: doc.title,
      summary: doc.summary,
      body: doc.body,
      author: {
        _id: doc.author._id,
        name: doc.author.name,
        image: doc.author.image,
        country: doc.author.country
      },
      community: {
        title: doc.community.title,
        image: doc.community.image
      },
      likes: doc.likes
    }
  } )
  
  return feedPosts
}
