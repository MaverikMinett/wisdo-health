import { Types, Document } from 'mongoose'
import { PostStatus } from '../enums/post-status.enum';

export interface IPost extends Document {
  title: string;
  summary: string;
  body: string;
  bodyLength: number;
  author: Types.ObjectId;
  community: Types.ObjectId;
  likes: number;
  status: PostStatus
  weight: number;
}

export interface INewPostParams {
  title: string;
  summary?: string;
  body: string;
  community: string;
}

export interface ICreatePostParams {
  title: string;
  summary: string;
  body: string;
  bodyLength: number;
  author: Types.ObjectId;
  community: Types.ObjectId;
  weight: number;
}

export interface ICreatePostResponse {
  _id: Types.ObjectId
}

export interface IFeedPostDocument extends Omit<IPost,'author'|'community'> {
  author: {
    _id: Types.ObjectId;
    image?: string;
    name: string;
    country: string;
  };
  community: {
    _id: Types.ObjectId;
    title: string;
    image?: string;
  }
}

export interface IFeedPost {
  _id: Types.ObjectId;
  title: string;
  summary: string;
  body: string;
  author: {
    _id: Types.ObjectId;
    image?: string;
    name: string;
    country: string;
  };
  community: {
    title: string;
    image?: string;
  };
  likes: number;
}