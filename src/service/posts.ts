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
    .then((posts: SimplePost[]) => posts.map((post) => ({ ...post, image: urlFor(post.image) })));
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
