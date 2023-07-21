"use client";
import { HomelUser } from "@/model/user";
import Link from "next/link";
import { PropagateLoader } from "react-spinners";
import useSWR from "swr";
import Avatar from "./Avatar";
import Multicarousel from "./Multicarousel";

const FollowingBar = () => {
  const { data, isLoading, error } = useSWR<HomelUser>("/api/me");
  const users = data?.following;

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
