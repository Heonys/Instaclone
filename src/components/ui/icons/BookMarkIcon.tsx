import { RiBookmarkLine } from "react-icons/ri";

type Props = {
  className?: string;
};

const BookMarkIcon = ({ className }: Props) => {
  return <RiBookmarkLine className={className || "w-6 h-6"} />;
};

export default BookMarkIcon;
