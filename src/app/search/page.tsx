import SearchPage from "@/components/SearchUser";
import { Metadata } from "next";
import React from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "User Search",
  description: "Search users to fllow",
};

const searchPage = () => {
  return <SearchPage />;
};

export default searchPage;
