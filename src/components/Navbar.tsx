"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import {
  HomeFillIcon,
  HomeIcon,
  NewFillIcon,
  NewIcon,
  SearchFillIcon,
  SearchIcon,
} from "@/components/ui/icons";
import ColorButton from "./ui/ColorButton";
import { useSession, signIn, signOut } from "next-auth/react";
import Avatar from "./Avatar";

const navMenu = [
  {
    href: "/",
    icon: <HomeIcon />,
    clikedIcon: <HomeFillIcon />,
    title: "Home",
  },
  {
    href: "/search",
    icon: <SearchIcon />,
    clikedIcon: <SearchFillIcon />,
    title: "search",
  },
  {
    href: "/new",
    icon: <NewIcon />,
    clikedIcon: <NewFillIcon />,
    title: "new post",
  },
];

const Navigation = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const user = session?.user;

  return (
    <section className="flex justify-between items-center px-6">
      <Link href="/" aria-label="home">
        <h1 className="font-bold text-3xl">Instagram</h1>
      </Link>
      <nav>
        <ul className="flex items-center gap-4 p-4">
          {navMenu.map(({ href, icon, clikedIcon, title }) => {
            return (
              <li key={href}>
                <Link aria-label={title} href={href}>
                  {pathname === href ? clikedIcon : icon}
                </Link>
              </li>
            );
          })}
          {user && (
            <li>
              <Link href={`/user/${user.username}`} aria-label="logged user">
                <Avatar size="sm" highlight image={user.image} />
              </Link>
            </li>
          )}
          <li>
            {session ? (
              <ColorButton text="Sign out" onClick={() => signOut()} />
            ) : (
              <ColorButton text="Sign in" onClick={() => signIn()} />
            )}
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Navigation;
