"use client";
import React from "react";
import PostListCard from "./PostListCard";
import GridSpinner from "./ui/GridSpinner";
import usePosts from "@/hooks/usePosts";

const PostList = () => {
  const { posts, isLoading } = usePosts();

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
