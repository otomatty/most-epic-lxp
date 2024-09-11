import { Timestamp } from "@firebase/firestore-types";

declare namespace FirestoreCollections {
  interface Community {
    communityId: string;
    communityName: string;
    participants: string[];
    communityImage: string;
    chats: Chat[];
    forums: Forum[];
    knowledgeShare: KnowledgeSharePost[];
    challenges: Challenge[];
  }

  interface Chat {
    chatId: string;
    participants: string[];
    messages: Message[];
  }

  interface Message {
    messageId: string;
    senderId: string;
    content: string;
    timestamp: Timestamp;
  }

  interface Forum {
    forumId: string;
    title: string;
    creatorId: string;
    posts: ForumPost[];
  }

  interface ForumPost {
    postId: string;
    authorId: string;
    content: string;
    timestamp: Timestamp;
    comments: Comment[];
  }

  interface Comment {
    commentId: string;
    authorId: string;
    content: string;
    timestamp: Timestamp;
  }

  interface KnowledgeSharePost {
    postId: string;
    authorId: string;
    title: string;
    content: string;
    tags: string[];
    upvotes: number;
    createdAt: Timestamp;
  }

  interface Challenge {
    challengeId: string;
    creatorId: string;
    title: string;
    description: string;
    targetDate: Timestamp;
    participants: ChallengeParticipant[];
    rewards: Reward[];
  }

  interface ChallengeParticipant {
    userId: string;
    progress: number;
    rank: number;
  }

  interface Reward {
    rewardId: string;
    type: string;
    value: number;
  }
}

declare interface CommunitiesCollection {
  [communityId: string]: FirestoreCollections.Community;
}
