import Avatar from "./Avatar";
import type { AuthUser } from "@/model/user";

type Props = {
  user: AuthUser;
};

const SideBar = ({ user: { name, email, username, image } }: Props) => {
  return (
    <article className="flex flex-col justify-center items-center">
      <div className="flex items-center gap-2">
        {image && <Avatar image={image} />}
        <div>
          <h1 className="font-bold leading-4">{username}</h1>
          <h2 className="text-lg text-neutral-500">{name}</h2>
        </div>
      </div>
      <p className="text-neutral-500 text-sm mt-8">
        About • Help • Press • API • Jops • Privacy • Terms • Location • Language
      </p>
      <footer className="font-bold text-neutral-500 mt-8 text-sm">{`@Copyright Instagram from META`}</footer>
    </article>
  );
};

export default SideBar;
