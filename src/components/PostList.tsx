"use client";
import { SimpePost } from "@/model/posts";
import React from "react";
import { GridLoader } from "react-spinners";
import useSWR from "swr";
import PostListCard from "./PostListCard";

const PostList = () => {
  const { data: posts, isLoading, error } = useSWR<SimpePost[]>("/api/posts");

  console.log(posts);

  return (
    <section>
      {isLoading && (
        <div className="text-center mt-32">
          <GridLoader color="red" />
        </div>
      )}
      <ul className="flex flex-col gap-4">
        {posts &&
          posts.map((post) => {
            return (
              <li key={post.id}>
                <PostListCard post={post} />
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default PostList;
