import Avatar from "./Avatar";

type Props = {
  username: string;
  image: string;
};

const PostUserAvatar = ({ username, image }: Props) => {
  return (
    <div className="flex items-center p-2">
      <Avatar image={image} size="md" highlight />
      <span className="font-bold text-gray-900 ml-2">{username}</span>
    </div>
  );
};

export default PostUserAvatar;
