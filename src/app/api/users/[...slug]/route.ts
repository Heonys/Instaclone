import { NextResponse, NextRequest } from "next/server";
import { getPostOf, getLikedOf, getSaveddOf } from "@/service/posts";

type Context = {
  params: {
    slug: string[];
  };
};

export async function GET(req: NextRequest, context: Context) {
  const { slug } = context.params;

  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const [username, query] = slug;

  let request = getPostOf;
  if (query === "liked") {
    request = getLikedOf;
  } else if (query === "saved") {
    request = getSaveddOf;
  }
  return request(username).then((res) => NextResponse.json(res));
}
