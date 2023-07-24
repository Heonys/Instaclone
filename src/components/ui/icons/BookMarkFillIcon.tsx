import { RiBookmarkFill } from "react-icons/ri";

type Props = {
  className?: string;
};

const BookMarkFillIcon = ({ className }: Props) => {
  return <RiBookmarkFill className={className || "w-6 h-6"} />;
};

export default BookMarkFillIcon;
