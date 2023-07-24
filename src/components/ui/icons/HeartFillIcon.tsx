import { AiFillHeart } from "react-icons/ai";

type Props = {
  className?: string;
};
const HeartFillIcon = ({ className }: Props) => {
  return <AiFillHeart className={className || "w-7 h-7 fill-red-500"} />;
};

export default HeartFillIcon;
