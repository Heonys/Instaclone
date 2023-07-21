"use client";
import { HomelUser, ProfileUser } from "@/model/user";
import useSWR from "swr";
import Button from "./ui/Button";

type Props = {
  user: ProfileUser;
};
export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { data: loggedUser } = useSWR<HomelUser>("/api/me");

  const showButton = loggedUser && loggedUser.username !== username;
  const following = loggedUser && loggedUser.following.find((item) => item.username === username);
  const text = following ? "UnFollow" : "Follow";

  return <>{showButton && <Button text={text} onClick={() => {}} red={text === "UnFollow"} />}</>;
}
