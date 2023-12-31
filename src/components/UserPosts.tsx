"use client";
import { ProfileUser } from "@/model/user";
import { useState } from "react";
import { PostIcon, HeartIcon, BookMarkIcon } from "@/components/ui/icons";
import PostGrid from "./PostGrid";
import { CacheKeyContext } from "@/context/CacheKeyContext";

type Props = {
  user: ProfileUser;
};

const tabs = [
  { type: "posts", icon: <PostIcon /> },
  { type: "saved", icon: <BookMarkIcon className="w-3 h-3" /> },
  { type: "liked", icon: <HeartIcon className="w-3 h-3" /> },
];

export default function UserPosts({ user: { username } }: Props) {
  const [query, setQuery] = useState(tabs[0].type);

  return (
    <section>
      <ul className="flex justify-center uppercase ">
        {tabs.map(({ type, icon }) => {
          return (
            <li
              key={type}
              onClick={() => setQuery(type)}
              className={`mx-12 p-4 cursor-pointer border-black ${
                type === query && "font-bold border-t"
              }  `}
            >
              <button className="scale-150 md:scale-100" aria-label={type}>
                {icon}
              </button>
              <span className="hidden md:inline">{type}</span>
            </li>
          );
        })}
      </ul>
      <CacheKeyContext.Provider value={{ postKey: `/api/users/${username}/${query}` }}>
        <PostGrid />
      </CacheKeyContext.Provider>
    </section>
  );
}
