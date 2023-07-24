import { SimplePost } from "@/model/posts";
import { client, urlFor } from "./sanity";

const postProjection = `
...,
"username": author->username,
"userImage": author->image,
"likes": likes[]->username,
"image": photo, 
"text": comments[0].comment,
"comments": count(comments),
"id": _id,
"createdAt": _createdAt,
`;

export async function getFollowingPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"
    || author._ref in *[_type=="user" && username == "${username}"].following[]._ref] 
    | order(_createedAt desc){${postProjection}}`
    )
    .then(mapPosts);
}

export async function getPostById(id: string) {
  return client
    .fetch(
      `*[_type == "post" && _id == "${id}"][0]{
      ...,
      "username": author->username,
      "userImage": author->image,
      "image": photo,
      "likes": likes[]->username,
      comments[]{
        comment, 
        "username": author->username,
        "image": author->image,
      },
      "id": _id,
      "createdAt": _createdAt,
    }`
    )
    .then((post) => ({ ...post, image: urlFor(post.image) }));
}

export async function getPostOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}" ]
    | order(_createAt desc){
      ...,
      ${postProjection}
  }`
    )
    .then(mapPosts);
}

export async function getLikedOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && ${username} in likes[]->username ]
    | order(_createAt desc){
      ...,
      ${postProjection}
  }`
    )
    .then(mapPosts);
}

export async function getSaveddOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && _id in *[_type=="user" && username=="${username}"].bookmarks[]._ref  ]
    | order(_createAt desc){
      ...,
      ${postProjection}
  }`
    )
    .then(mapPosts);
}

function mapPosts(posts: SimplePost[]) {
  return posts.map((post: SimplePost) => ({
    ...post,
    likes: post.likes ?? [],
    image: urlFor(post.image),
  }));
}

export async function likePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .setIfMissing({ likes: [] })
    .append("likes", [
      {
        _ref: userId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function dislikePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .unset([`likes[_ref == "${userId}"]`])
    .commit({ autoGenerateArrayKeys: true });
}
