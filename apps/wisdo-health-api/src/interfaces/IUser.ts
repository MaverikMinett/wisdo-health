import { Types, Document } from 'mongoose'

export interface IUser extends Document {
  name: string;
  email?: string;
  image?: string;
  country: string;
  communities: Types.ObjectId[]
}
