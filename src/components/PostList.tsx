"use client";
import { SimplePost } from "@/model/posts";
import React from "react";
import useSWR from "swr";
import PostListCard from "./PostListCard";
import GridSpinner from "./ui/GridSpinner";

const PostList = () => {
  const { data: posts, isLoading } = useSWR<SimplePost[]>("/api/posts");

  return (
    <section>
      {isLoading && (
        <div className="text-center mt-32">
          <GridSpinner color="red" />
        </div>
      )}
      <ul className="flex flex-col gap-4">
        {posts &&
          posts.map((post, index) => {
            return (
              <li key={post.id}>
                <PostListCard post={post} priority={index < 2} />
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default PostList;
