import { ProfileUser, SearchUser } from "@/model/user";
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
      users.map((user: SearchUser) => ({
        ...user,
        follwoer: user.follwoer ?? 0,
        following: user.following ?? 0,
      }))
    );
}

export async function getUserForProfile(username: string) {
  return client
    .fetch(
      `*[_type == "user" && username == "${username}"][0]{
        ...,
        "id": _id,
        "following": count(following),
        "follwoer": count(follwoer),
        "posts": count(*[_type == "post" && author->username == "${username}"])
      }`
    )
    .then<ProfileUser>((user) => ({
      ...user,
      follwoer: user.follwoer ?? 0,
      following: user.following ?? 0,
      posts: user.posts ?? 0,
    }));
}
