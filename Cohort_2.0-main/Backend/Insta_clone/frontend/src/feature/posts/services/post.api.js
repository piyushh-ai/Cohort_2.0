import axios from "axios";

const api = axios.create({
  baseURL: "https://insta-clone-utbx.onrender.com/api",
  withCredentials: true,
});

export async function getFeed() {
  const response = await api.get("/posts/feed");

  return response.data;
}

export async function createPost(imagefile, caption) {
  const formData = new FormData();

  formData.append("postImage", imagefile);
  formData.append("caption", caption);

  const response = await api.post("/posts", formData);

  return response.data;
}

export async function likePost(postId) {
  const response = await api.post(`/posts/like/${postId}`);

  return response.data;
}

export async function unlikePost(postId) {
  const response = await api.post(`/posts/unlike/${postId}`);

  return response.data;
}

export async function getComment(postId) {
  const response = await api.get(`/posts/comment/${postId}`);

  return response;
}

export async function postComment(postId, userComment) {
  const response = await api.post(`/posts/comment/${postId}`, { userComment });

  return response;
}

export async function deleteComment(commentId) {
  const response = await api.delete(`/posts/comment/${commentId}`);

  return response.data
}

export async function deletePost(postId) {
  const response = await api.delete(`/posts/${postId}`);

  return response.data
}
