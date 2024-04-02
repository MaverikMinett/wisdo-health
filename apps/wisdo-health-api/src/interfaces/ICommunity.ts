import { Document } from 'mongoose'

export interface ICommunity extends Document {
  title: string;
  image?: string;
  memberCount: number;
}