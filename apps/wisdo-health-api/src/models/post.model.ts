import mongoose, { Schema } from 'mongoose';
import { IPost } from '../interfaces/IPost';
import { PostStatus } from '../enums/post-status.enum';

const postSchema = new Schema<IPost>({
  title: { 
    type: String, 
    required: true 
  },
  summary: { 
    type: String, 
    required: true 
  },
  body: { 
    type: String, 
    required: true 
  },
  author: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  community: { 
    type: Schema.Types.ObjectId, 
    ref: 'Community', 
    required: true 
  },
  likes: { 
    type: Number, 
    default: 0 
  },
  status: { 
    type: String, 
    enum: Object.values(PostStatus),
    default: PostStatus.Pending
  },
  weight: { 
    type: Number, 
    default: 0 
  }
});

export const Post = mongoose.model('Post', postSchema);
