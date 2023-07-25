"use client";
import Link from "next/link";
import { PropagateLoader } from "react-spinners";
import Avatar from "./Avatar";
import Multicarousel from "./Multicarousel";
import useMe from "@/hooks/useMe";

const FollowingBar = () => {
  const { user, isLoading, error } = useMe();
  const users = user?.following;

  return (
    <section className="flex justify-center w-full items-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[100px] overflow-x-scroll relative z-0">
      {isLoading ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have following`}</p>
      )}
      {users && users.length > 0 && (
        <Multicarousel>
          {users.map(({ username, image }) => {
            return (
              <Link
                key={username}
                href={`/user/${username}`}
                className="flex flex-col items-center w-20"
              >
                <Avatar image={image} highlight />
                <p className="text-sm text-center text-ellipsis overflow-hidden w-full">
                  {username}
                </p>
              </Link>
            );
          })}
        </Multicarousel>
      )}
    </section>
  );
};

export default FollowingBar;
