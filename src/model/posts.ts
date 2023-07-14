export type Comment = {
  username: string;
  image: string;
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
  commnets: number;
};
