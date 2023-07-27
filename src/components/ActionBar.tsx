"use client";
import { HeartIcon, BookMarkIcon, HeartFillIcon, BookMarkFillIcon } from "@/components/ui/icons";
import { parseDate } from "@/util/date";
import ToggleButton from "./ui/ToggleButton";
import { SimplePost } from "@/model/posts";
import usePosts from "@/hooks/usePosts";
import useMe from "@/hooks/useMe";

type Props = {
  post: SimplePost;
  children?: React.ReactNode;
};

const ActionBar = ({ post, children }: Props) => {
  const { id, likes, text, username, createdAt } = post;
  const { user, setBookmark } = useMe();
  const { setLike } = usePosts();

  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user?.bookmarks.includes(id) ?? false;

  const handleLike = (like: boolean) => {
    user && setLike(post, user.username, like);
  };
  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(id, bookmark);
  };
  return (
    <>
      <div className="flex justify-between my-2 p-4">
        <ToggleButton
          title={liked ? "unlike" : "like"}
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          ofIcon={<HeartIcon />}
        />
        <ToggleButton
          title={liked ? "unbookmark" : "bookmark"}
          toggled={bookmarked}
          onToggle={handleBookmark}
          onIcon={<BookMarkFillIcon />}
          ofIcon={<BookMarkIcon />}
        />
      </div>
      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? "likes" : "like"
        }`}</p>
        {children}
        <p className="text-xs text-neutral-500 uppercase my-2">{parseDate(createdAt)}</p>
      </div>
    </>
  );
};

export default ActionBar;
