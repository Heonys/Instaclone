"use client";
import { SimplePost } from "@/model/posts";
import Image from "next/image";
import CommentForm from "./CommentForm";
import ActionBar from "./ActionBar";
import { useState } from "react";
import ModalPortal from "./ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import PostUserAvatar from "./PostUserAvatar";

type Props = {
  post: SimplePost;
  priority?: boolean;
};

const PostListCard = ({ post, priority = false }: Props) => {
  const { username, userImage, likes, image, text, createdAt, commnets } = post;

  const [openModal, setOpenModal] = useState(false);

  return (
    <article className="rounded-lg shadow-md border border-gray-200 relative">
      <PostUserAvatar username={username} image={userImage} />
      <Image
        className="w-full object-cover aspect-square"
        onClick={() => setOpenModal(true)}
        src={image}
        width={500}
        height={500}
        alt={`${username}'s image`}
        priority={priority}
      />
      <ActionBar username={username} text={text} createdAt={createdAt} likes={likes} />
      <CommentForm />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
};

export default PostListCard;
