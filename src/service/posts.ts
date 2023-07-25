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
      `*[_type == "post" && "${username}" in likes[]->username ]
    | order(_createdAt desc){
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
  return client // 디비에서
    .patch(postId) // 해당 id로 식별되는 문서를 업데이트 할건데
    .setIfMissing({ likes: [] }) // 만약 해당  likes라는 필드가 없다면 초기화
    .append("likes", [
      // likes 배열에 새로운 요소를 추가할건데
      {
        _ref: userId, // id가 userid인 user를 추가
        _type: "reference", // likes는 reference 타입의 배열이기 때문
      },
    ])
    .commit({ autoGenerateArrayKeys: true }); // 배열의 키를 자동으로 생성
}

export async function dislikePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .unset([`likes[_ref == "${userId}"]`])
    .commit({ autoGenerateArrayKeys: true });
}

export async function addComment(postId: string, userId: string, comment: string) {
  console.log("api route ::", postId, userId, comment);

  return client
    .patch(postId)
    .setIfMissing({ comments: [] })
    .append("comments", [
      {
        comment,
        author: { _ref: userId, _type: "reference" },
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}
