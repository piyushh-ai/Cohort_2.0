import axios from "axios";

const api = axios.create({
  baseURL: "https://insta-clone-utbx.onrender.com/api/auth",
  withCredentials: true,
});

export async function login(username, password) {
  try {
    const response = await api.post("/login", { username, password });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function register(username, email, password) {
  try {
    const response = await api.post("/register", { username, email, password });
    return response;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

export const handleLogout = async () => {
  try {
    const response = await api.get("/logout");
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function getMe() {
  try {
    const response = await api.post("/get-me");
    return response.data;
  } catch (error) {
    console.error("Get me error:", error);
    throw error;
  }
}
