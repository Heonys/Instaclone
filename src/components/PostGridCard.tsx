"use client";
import { useState } from "react";
import { SimplePost } from "@/model/posts";
import Image from "next/image";
import ModalPortal from "./ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import { useSession, signIn } from "next-auth/react";

type Props = {
  post: SimplePost;
  priority: boolean;
};
export default function PostGridCard({ post, priority }: Props) {
  const { data: session } = useSession();
  const { image, username } = post;
  const [openModal, setOpenModal] = useState(false);

  const handleOpenPost = () => {
    if (!session?.user) {
      return signIn();
    }
    setOpenModal(true);
  };

  return (
    <div className="relative w-full aspect-square">
      <Image
        className="object-cover"
        src={image}
        alt={`photo by ${username}`}
        fill
        sizes="650px"
        priority={priority}
        onClick={handleOpenPost}
      />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </div>
  );
}
