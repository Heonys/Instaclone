import { ProfileUser } from "@/model/user";
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

export async function searchUsers(keyword?: string) {
  const query = keyword ? `&& (name match "${keyword}" || username match "${keyword}" )` : "";

  return client
    .fetch(
      `*[_type == "user" ${query} ]{
    ...,
    "following": count(following),
    "follwoer": count(follwoer),
  }`
    )
    .then((users) =>
      users.map((user: ProfileUser) => ({
        ...user,
        follwoer: user.follwoer ?? 0,
        following: user.following ?? 0,
      }))
    );
}
