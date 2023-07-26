import { useCacheKey } from "@/context/CacheKeyContext";
import { SimplePost } from "@/model/posts";
import { useCallback } from "react";
import useSWR from "swr";

const updateLike = async (id: string, like: boolean) => {
  return fetch("/api/likes", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
};

const addComment = async (id: string, comment: string) => {
  return await fetch("/api/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
};

export default function usePosts() {
  const cacheKey = useCacheKey();
  const { data: posts, mutate, isLoading, error } = useSWR<SimplePost[]>(cacheKey.postKey);

  const setLike = useCallback(
    (post: SimplePost, username: string, like: boolean) => {
      const newPost = {
        ...post,
        likes: like ? [...post.likes, username] : post.likes.filter((v) => v !== username),
      };
      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

      return mutate(updateLike(post.id, like), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [mutate, posts]
  );

  const postComment = useCallback(
    (post: SimplePost, comment: string) => {
      const newPost = {
        ...post,
        comments: post.comments + 1,
      };
      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

      return mutate(addComment(post.id, comment), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [mutate, posts]
  );

  return { posts, isLoading, error, setLike, postComment };
}
