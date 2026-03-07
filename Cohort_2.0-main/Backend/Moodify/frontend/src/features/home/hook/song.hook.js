import { useContext } from "react";
import { SongContext } from "../songContext";
import { getAllSongs, getSong } from "../services/song.api";

export const useSong = () => {
  const context = useContext(SongContext);
  const { song, setSong, loading, setLoading, allSong, setAllSong } = context;

  const handleGetSong = async ({ mood }) => {
    try {
      setLoading(true);
      const data = await getSong({ mood });
      // API returns song as array — extract first element
      const songData = Array.isArray(data?.song) ? data.song[0] : data?.song;
      setSong(songData);
    } catch (error) {
      console.log("handleGetSong error " + error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetAllSongs = async () => {
    try {
      const data = await getAllSongs();
      if (data?.songs) {
        setAllSong(data.songs);
      }
    } catch (error) {
      console.log("handleGetAllSongs error " + error);
    }
  };

  return {
    loading,
    song,
    allSong,
    handleGetSong,
    handleGetAllSongs,
  };
};