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

export async function getUserByUsername(username: string) {
  return client.fetch(`*[_type == "user" && username == "${username}"][0]{
    ...,
    "id": _id,
    following[]->{username, image},
    follwoer[]->{username, image},
    "bookmarks": bookmarks[]->_id
  }`);
}
