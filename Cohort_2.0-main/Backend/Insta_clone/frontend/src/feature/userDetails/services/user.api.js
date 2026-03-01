import axios from "axios";

const api = axios.create({
  baseURL: "https://insta-clone-utbx.onrender.com/api/follow",
  withCredentials: true,
});

export const getFollowingApi = async () => {
    const response = await api.get("/following")
    
    return response.data
};

export const getFollowerApi = async () => {
    const response = await api.get("/followers")
    
    return response.data
};

export const getSuggestApi = async () => {
    const response = await api.get("/suggestions")
    
    return response.data
};


export const followApi = async (userId)=>{
    const response = await api.post(`/followUser/${userId}`)

    return response.data
}

export const unFollowApi = async (userId)=>{
    const response = await api.post(`/unfollowUser/${userId}`)

    return response.data
}