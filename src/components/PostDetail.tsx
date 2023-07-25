import { SimplePost } from "@/model/posts";
import Image from "next/image";

import PostUserAvatar from "./PostUserAvatar";
import ActionBar from "./ActionBar";
import CommentForm from "./CommentForm";
import Avatar from "./Avatar";
import useFullPost from "@/hooks/useFullPost";
import useMe from "@/hooks/useMe";

type Props = {
  post: SimplePost;
};

const PostDetail = ({ post }: Props) => {
  const { id, username, userImage, image } = post;
  const { post: data, postComment } = useFullPost(id);
  const { user } = useMe();
  const commnets = data?.comments;

  const onPostComent = (comment: string) => {
    user &&
      postComment({
        username: user.username,
        image: user.image,
        comment,
      });
  };

  return (
    <section className="flex w-full h-full">
      <div className="relative basis-3/5">
        <Image
          className="object-cover"
          src={image}
          alt={`${username}'s photo`}
          priority
          fill
          sizes="650px"
        />
      </div>
      <div className="w-full basis-2/5 flex flex-col">
        <PostUserAvatar username={username} image={userImage} />
        <ul className="border-t border-gray-200 h-full overflow-y-auto p-4 mb-1">
          {commnets &&
            commnets.map(
              ({ username: commnetUserName, image: commentUserImage, comment }, index) => {
                return (
                  <li key={index} className="flex items-center mb-1">
                    <Avatar
                      image={commentUserImage}
                      size="sm"
                      highlight={username === commnetUserName}
                    />
                    <div className="ml-2">
                      <span className="font-bold mr-1">{commnetUserName}</span>
                      <span>{comment}</span>
                    </div>
                  </li>
                );
              }
            )}
        </ul>
        <ActionBar post={post} />
        <CommentForm onPostComent={onPostComent} />
      </div>
    </section>
  );
};

export default PostDetail;
