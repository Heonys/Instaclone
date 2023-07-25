"use client";
import { ProfileUser } from "@/model/user";
import Button from "./ui/Button";
import useMe from "@/hooks/useMe";

type Props = {
  user: ProfileUser;
};
export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { user: loggedUser } = useMe();

  const showButton = loggedUser && loggedUser.username !== username;
  const following = loggedUser && loggedUser.following.find((item) => item.username === username);
  const text = following ? "UnFollow" : "Follow";

  return <>{showButton && <Button text={text} onClick={() => {}} red={text === "UnFollow"} />}</>;
}
