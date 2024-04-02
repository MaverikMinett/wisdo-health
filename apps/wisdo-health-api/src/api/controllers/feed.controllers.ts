import { Response } from 'express';
import { AuthenticatedRequest } from "../../interfaces/AuthenticatedRequest";
import { getFeed } from "../services/feed.service";
import { IFeedPost } from '../../interfaces/IPost';

export const getFeedController = async (req: AuthenticatedRequest, res: Response) => {
 
  let posts: IFeedPost[] = []
  try {
    posts = await getFeed(req.auth);
  }
  catch (error) {
    console.warn(error);
    res.status(500).send("An error occurred");
    return;
  }

  res.status(200).send(posts);
}