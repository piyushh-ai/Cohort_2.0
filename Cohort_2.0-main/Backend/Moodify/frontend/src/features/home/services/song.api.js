import axios from "axios";

const api = axios.create({
  baseURL: "https://moodify-21kd.onrender.com/api",
  withCredentials: true,
});

export const getSong = async ({ mood }) => {
  try {
    const response = await api.get(`/song?mood=${mood}`);
    return response.data;
  } catch (error) {
    console.log("song api error " + error);
  }
};

export const getAllSongs = async()=>{
  try {
    const response = await api.get("/song/all-songs")
    return response.data
  } catch (error) {
    console.log("get all songs error " + error);
    
  }
}
