import { User } from "../models/user.model";

export const getUserByName = async(name: string) => {
  return User.findOne({ name });
}
