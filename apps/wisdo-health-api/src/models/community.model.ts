import mongoose, { Schema } from 'mongoose';
import { ICommunity } from '../interfaces/ICommunity';

const communitySchema = new Schema<ICommunity>({
  title: { 
    type: String, 
    required: true,
    unique: true
  },
  image: {
    String
  },
  memberCount: { 
    type: Number,
    default: 0 
  },
});

export const Community = mongoose.model('Community', communitySchema);
