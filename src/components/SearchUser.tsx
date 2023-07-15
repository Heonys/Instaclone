"use client";
import { ProfileUser } from "@/model/user";
import React, { useState, ChangeEvent, FormEvent } from "react";
import useSWR from "swr";
import GridSpinner from "./ui/GridSpinner";
import UserCard from "./UserCard";

const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const { data: users, isLoading, error } = useSWR<ProfileUser[]>(`/api/search/${keyword}`);

  const onSubmit = (evnet: FormEvent<HTMLFormElement>) => {
    evnet?.preventDefault();
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };
  return (
    <section className="w-full max-w-2xl my-4 flex flex-col items-center">
      <form className="w-full mb-4" onSubmit={onSubmit}>
        <input
          className="w-full text-xl p-3 outline-none border border-gray-400"
          type="text"
          onChange={onChange}
          value={keyword}
          autoFocus
          placeholder="Search for a name or username"
        />
      </form>
      {error && <p>네트워크 에러</p>}
      {isLoading && <GridSpinner />}
      {!error && !isLoading && users?.length === 0 && <p>찾는 사용자가 없습니다</p>}
      <ul className="w-full p-4">
        {users &&
          users.map((user) => {
            return (
              <li key={user.name}>
                <UserCard user={user} />
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default SearchPage;
