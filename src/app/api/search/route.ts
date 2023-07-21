import { searchUsers } from "@/service/user";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return searchUsers().then((res) => NextResponse.json(res));
}
