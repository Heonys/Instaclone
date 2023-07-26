import { HomelUser } from "@/model/user";
import { useCallback } from "react";
import useSWR from "swr";

const updateBookmark = async (postId: string, bookmark: boolean) => {
  return fetch("/api/bookmarks", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: postId, bookmark }),
  }).then((res) => res.json());
};

const updateFollow = async (targetId: string, follow: boolean) => {
  return fetch("/api/follow", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: targetId, follow }),
  }).then((res) => res.json());
};

export default function useMe() {
  const { data: user, mutate, isLoading, error } = useSWR<HomelUser>("/api/me");

  const setBookmark = useCallback(
    (postId: string, bookmark: boolean) => {
      if (!user) return;
      const bookmarks = user.bookmarks;
      const newUser = {
        ...user,
        bookmarks: bookmark //
          ? [...bookmarks, postId]
          : bookmarks.filter((v) => v !== postId),
      };

      return mutate(updateBookmark(postId, bookmark), {
        optimisticData: newUser,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [user, mutate]
  );

  const toggleFollow = useCallback(
    (targetId: string, follow: boolean) => {
      return mutate(updateFollow(targetId, follow), {
        populateCache: false,
      });
    },
    [mutate]
  );

  return { user, isLoading, error, setBookmark, toggleFollow };
}
