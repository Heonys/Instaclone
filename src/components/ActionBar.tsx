"use client";
import { HeartIcon, BookMarkIcon, HeartFillIcon, BookMarkFillIcon } from "@/components/ui/icons";
import { parseDate } from "@/util/date";
import { useState } from "react";
import ToggleButton from "./ui/ToggleButton";
import { SimplePost } from "@/model/posts";
import { useSession } from "next-auth/react";
import usePosts from "@/hooks/usePosts";

type Props = {
  post: SimplePost;
};

const ActionBar = ({ post }: Props) => {
  const { id, likes, text, username, createdAt } = post;
  const { data: session } = useSession();
  const user = session?.user;
  const liked = user ? likes.includes(user.username) : false;
  const [bookmarked, setBookmarked] = useState(false);
  const { setLike } = usePosts();

  const handleLike = (like: boolean) => {
    if (user) {
      setLike(post, user.username, like);
    }
  };
  return (
    <>
      <div className="flex justify-between my-2 p-4">
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          ofIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={setBookmarked}
          onIcon={<BookMarkFillIcon />}
          ofIcon={<BookMarkIcon />}
        />
      </div>
      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? "likes" : "like"
        }`}</p>
        {text && (
          <p>
            <span className="font-bold mr-1">{username}</span>
            {text}
          </p>
        )}
        <p className="text-xs text-neutral-500 uppercase my-2">{parseDate(createdAt)}</p>
      </div>
    </>
  );
};

export default ActionBar;
