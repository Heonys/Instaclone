import { SimpePost } from "@/model/posts";
import Avatar from "./Avatar";
import Image from "next/image";
import { HeartIcon, BookMarkIcon, SmileIcon } from "@/components/ui/icons";
import { parseDate } from "@/util/date";

type Props = {
  post: SimpePost;
};

const PostListCard = ({ post }: Props) => {
  const { username, userImage, likes, image, text, createdAt, commnets } = post;
  return (
    <article className="rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center p-2">
        <Avatar image={userImage} size="md" highlight />
        <span className="font-bold text-gray-900 ml-2">{username}</span>
      </div>
      <Image
        className="w-full object-cover aspect-square"
        src={image}
        width={500}
        height={500}
        alt={`${username}'s image`}
      />
      <div className="flex justify-between my-2 p-4">
        <HeartIcon />
        <BookMarkIcon />
      </div>
      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${likes?.length > 1 ? "likes" : "like"}`}</p>
        <p>
          <span className="font-bold mr-1">{username}</span>
          {text}
        </p>
        <p className="text-xs text-neutral-500 uppercase my-2">{parseDate(createdAt)}</p>
      </div>

      <form className="flex items-center border-t border-neutral-300 px-4">
        <SmileIcon />
        <input className="w-full border-none ml-2 p-3 outline-none" type="text" placeholder="Add a comment ... " />
        <button className="font-bold text-sky-500 ml-2">Post</button>
      </form>
    </article>
  );
};

export default PostListCard;
