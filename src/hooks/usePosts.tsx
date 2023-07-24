import { SimplePost } from "@/model/posts";
import useSWR from "swr";

const updateLike = async (id: string, like: boolean) => {
  return fetch("/api/likes", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
};

export default function usePosts() {
  const { data: posts, mutate, isLoading, error } = useSWR<SimplePost[]>("/api/posts");

  const setLike = (post: SimplePost, username: string, like: boolean) => {
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
  };

  return { posts, isLoading, error, setLike };
}
