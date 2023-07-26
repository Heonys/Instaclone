import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { follow, unFollow } from "@/service/user";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const { id: targetId, follow: isFollow } = await req.json();
  if (!user) {
    return new Response("Authentication Error", { status: 404 });
  }

  if (!targetId || follow === undefined) {
    return new Response("Bad Request", { status: 400 });
  }

  const request = isFollow ? follow : unFollow;

  return request(user.id, targetId).then((res) => NextResponse.json(res));
}
