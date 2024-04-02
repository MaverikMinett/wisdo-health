import { Types, Document } from 'mongoose'
import { PostStatus } from '../enums/post-status.enum';

export interface IPost extends Document {
  title: string;
  summary: string;
  body: string;
  author: Types.ObjectId;
  community: Types.ObjectId;
  likes: number;
  status: PostStatus
  weight: number;
}
