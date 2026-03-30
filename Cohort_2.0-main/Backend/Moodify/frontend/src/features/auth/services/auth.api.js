import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const login = async ({ username, email, password }) => {
  try {
    const response = await api.post("/auth/login", {
      username,
      email,
      password,
    });
    return response;
  } catch (error) {
    console.log("login api error ", error);
    throw error;
  }
};

export const register = async ({ username, email, password }) => {
  try {
    const response = await api.post("/auth/register", {
      username,
      email,
      password,
    });
    return response;
  } catch (error) {
    console.log("register api error ", error);
    throw error;
  }
};

export const getMe = async () => {
  // Must throw on failure so AuthHook knows user is not logged in
  const response = await api.get("/auth/get-me");
  console.log(response);
  return response.data;
};

export const logOut = async () => {
  try {
    const response = await api.get("/auth/logout");
    return response.data;
  } catch (error) {
    console.log("logout api error ", error);
  }
};
