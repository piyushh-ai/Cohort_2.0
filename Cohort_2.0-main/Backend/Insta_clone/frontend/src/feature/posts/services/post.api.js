import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
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

  console.log(response);

  return response.data;
}

export async function likePost(postId) {
  const response = await api.post(`/posts/like/${postId}` );
  console.log(response);
  
  return response.data;
}

export async function unlikePost(postId) {
  const response = await api.post(`/posts/unlike/${postId}`);
  console.log(response);
  
  return response.data;
}
