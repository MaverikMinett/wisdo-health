import { User } from './models/user.model';
import { Community } from './models/community.model';
import { Post } from './models/post.model';
import { PostStatus } from './enums/post-status.enum';
import { POST_LENGTH_WEIGHT, POST_LIKES_WEIGHT } from './constants';

interface PostData {
  title: string;
  summary: string;
  body: string;
  likes: number;
  status: PostStatus
}

const posts = [
  { 
    title: 'Post A - Same Country Lower Weight', 
    summary: 'Lorem ipsum dolor sit amet', 
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    likes: 100,
    status: PostStatus.Active
  },
  { 
    title: 'Post B - Other Country Higher Weight', 
    summary: 'consectetur adipiscing elit', 
    body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    likes: 100,
    status: PostStatus.Active
  },
  { 
    title: 'Post C - Same Country Higher Weight', 
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', 
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex',
    likes: 150,
    status: PostStatus.Active
  },
  {
    title: 'Post D - Not Subscribed Community',
    summary: 'Ut enim ad minima veniam, quis nostrum exercitationem',
    body: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
    likes: 100,
    status: PostStatus.Active
  },
  {
    title: 'Post E - Pending Post',
    summary: 'Ut enim ad minima veniam, quis nostrum exercitationem',
    body: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
    likes: 100,
    status: PostStatus.Pending
  }
];

const calcBodyLengthAndWeight = (postData: PostData) => {
  const bodyLength = postData.body.split(' ').length;
  const weight = postData.likes * POST_LIKES_WEIGHT + postData.body.length * POST_LENGTH_WEIGHT;
  return { bodyLength, weight };
}

const clearFixtures = async () => {
 await User.deleteMany({});
 await Community.deleteMany({});
 await Post.deleteMany({});
}

const createFixtures = async () => {
  const communityA = new Community({
    title: 'Community A',
    memberCount: 500
  })
  await communityA.save();
  
  const communityB = new Community({
    title: 'Community B',
    memberCount: 46
  })
  await communityB.save();
  
  const communityC = new Community({
    title: 'Community C',
    memberCount: 4321
  })
  await communityC.save();
  
  const maverik = new User({
    name: 'Maverik',
    email: 'maverik.minett@gmail.com',
    country: 'United States',
    communities: [communityA, communityB]
  })
  await maverik.save();

  const lidor = new User({
    name: 'Lidor',
    email: 'lidor@wisdo.com',
    country: 'Israel',
    communities: [communityA,communityB,communityC]
  })
  await lidor.save();

  const ron = new User({
    name: 'Ron',
    email: 'ron@wisdo.com',
    country: 'United States',
    communities: [communityB,communityC]
  })
  await ron.save();

  
  const postASameCountry = new Post({
    ...posts[0],
    author: ron,
    likes: 100,
    community: communityA,
    ...calcBodyLengthAndWeight(posts[0])
  });
  await postASameCountry.save()

  const postBOtherCountryHigherWeight = new Post({
    ...posts[1],
    author: lidor,
    likes: 200,
    community: communityB,
    ...calcBodyLengthAndWeight(posts[1])
  })
  await postBOtherCountryHigherWeight.save();

  const postCSameCountryHigherWeight = new Post({
    ...posts[2],
    author: ron,
    community: communityB,
    ...calcBodyLengthAndWeight(posts[2])
  })
  await postCSameCountryHigherWeight.save();

  const PostDNotSubscribedCommunity = new Post({
    ...posts[3],
    author: lidor,
    community: communityC,
    ...calcBodyLengthAndWeight(posts[3])
  });
  await PostDNotSubscribedCommunity.save();

  const PostEPendingPost = new Post({
    ...posts[4],
    author: lidor,
    community: communityA,
    ...calcBodyLengthAndWeight(posts[4])
  })
  await PostEPendingPost.save();
}

export const loadFixtures = async () => {
  await clearFixtures();
  await createFixtures();
}


