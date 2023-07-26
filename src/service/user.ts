import { ProfileUser, SearchUser } from "@/model/user";
import { client } from "./sanity";

type OauthUser = {
  id: string;
  name?: string;
  email?: string;
  image: string | null;
  username: string;
};
// followers
export async function addUser({ id, username, name, email, image }: OauthUser) {
  client.createIfNotExists({
    _id: id,
    _type: "user",
    name,
    username,
    email,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  });
}

export async function getUserByUsername(username: string) {
  return client.fetch(`*[_type == "user" && username == "${username}"][0]{
    ...,
    "id": _id,
    following[]->{username, image},
    followers[]->{username, image},
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
    "followers": count(followers),
  }`
    )
    .then((users) =>
      users.map((user: SearchUser) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
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
        "followers": count(followers),
        "posts": count(*[_type == "post" && author->username == "${username}"])
      }`
    )
    .then((user) => ({
      ...user,
      following: user.following ?? 0,
      followers: user.followers ?? 0,
      posts: user.posts ?? 0,
    }));
}

export async function addBookmark(userId: string, postId: string) {
  return client
    .patch(userId)
    .setIfMissing({ bookmarks: [] })
    .append("bookmarks", [
      {
        _ref: postId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmark(userId: string, postId: string) {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref == "${postId}"]`])
    .commit({ autoGenerateArrayKeys: true });
}

export async function follow(myid: string, targetId: string) {
  return client
    .transaction() //
    .patch(myid, (user) =>
      user
        .setIfMissing({ following: [] })
        .append("following", [{ _ref: targetId, _type: "reference" }])
    )
    .patch(targetId, (user) =>
      user
        .setIfMissing({ followers: [] }) //
        .append("followers", [{ _ref: myid, _type: "reference" }])
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function unFollow(myid: string, targetId: string) {
  return client
    .transaction() //
    .patch(myid, (user) => user.unset([`following[_ref == "${targetId}"]`]))
    .patch(targetId, (user) => user.unset([`followers[_ref == "${myid}"]`]))
    .commit({ autoGenerateArrayKeys: true });
}
