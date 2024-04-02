import { Community } from "../models/community.model"

export const findCommunityByTitle = async(communityTitle: string) => {
  return Community.findOne({title: communityTitle});
}
