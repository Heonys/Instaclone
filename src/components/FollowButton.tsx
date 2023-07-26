"use client";
import { ProfileUser } from "@/model/user";
import Button from "./ui/Button";
import useMe from "@/hooks/useMe";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";

type Props = {
  user: ProfileUser;
};
export default function FollowButton({ user }: Props) {
  const { username } = user;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFeching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFeching;

  const { user: loggedUser, toggleFollow } = useMe();
  const showButton = loggedUser && loggedUser.username !== username;
  const following = loggedUser && loggedUser.following.find((item) => item.username === username);
  const text = following ? "UnFollow" : "Follow";

  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(user.id, !following);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      {showButton && (
        <div className="relative">
          {isUpdating && (
            <div className="absolute z-20 flex inset-0 justify-center items-center">
              <PulseLoader size={6} />
            </div>
          )}
          <Button
            disabled={isUpdating}
            text={text}
            onClick={handleFollow}
            red={text === "UnFollow"}
          />
        </div>
      )}
    </>
  );
}
