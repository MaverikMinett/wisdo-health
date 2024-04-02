import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/IUser';

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
  },
  image: {
    type: String
  },
  country: {
    type: String
  },
  communities: [
    { 
      type: mongoose.Types.ObjectId, 
      ref: 'Community' 
    }
  ]
});

export const User = mongoose.model('User', userSchema);
