import { client } from "./sanity";

type OauthUser = {
  id: string;
  name?: string;
  email?: string;
  image: string | null;
  username: string;
};

export async function addUser({ id, username, name, email, image }: OauthUser) {
  client.createIfNotExists({
    _id: id,
    _type: "user",
    name,
    username,
    email,
    image,
    following: [],
    follwoer: [],
    bookmarks: [],
  });
}
