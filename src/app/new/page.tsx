import React from "react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import NewPosts from "@/components/NewPosts";

export const metadata: Metadata = {
  title: "New Posts",
  description: "Create a new post",
};

const newPage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/auth/signin");
  }
  return <NewPosts user={user} />;
};

export default newPage;
