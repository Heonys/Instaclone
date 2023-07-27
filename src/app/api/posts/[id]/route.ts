import { NextRequest, NextResponse } from "next/server";
import { getPostById } from "@/service/posts";
import { withSessionUser } from "@/util/session";

type Context = {
  params: { id: string };
};

export async function GET(request: NextRequest, context: Context) {
  return withSessionUser(async (user) =>
    getPostById(context.params.id).then((res) => NextResponse.json(res))
  );
}
