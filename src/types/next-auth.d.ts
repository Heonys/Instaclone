import NextAuth from "next-auth";
import type { AuthUser } from "@/model/user";
declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }
}
