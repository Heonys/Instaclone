export type Comment = {
  username: string;
  image?: string | undefined;
  comment: string;
};

export type FullPost = {
  id: string;
  username: string;
  userImage: string;
  text: string;
  image: string;
  createdAt: string;
  likes: string[];
  comments: Comment[];
};

export type SimplePost = Omit<FullPost, "comments"> & {
  comments: number;
};
