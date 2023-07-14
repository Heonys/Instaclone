import { HeartIcon, BookMarkIcon } from "@/components/ui/icons";
import { parseDate } from "@/util/date";

type Props = {
  likes: string[];
  text?: string;
  username: string;
  createdAt: string;
};

const ActionBar = ({ likes, text, username, createdAt }: Props) => {
  return (
    <>
      <div className="flex justify-between my-2 p-4">
        <HeartIcon />
        <BookMarkIcon />
      </div>
      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${likes?.length > 1 ? "likes" : "like"}`}</p>
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
