import { useCallback, useRef } from "react";

/**
 * useFahhSound — plays the actual fahh sound effect from public/sounds/
 *
 * File location: public/sounds/Fahhhh_-_Sound_effect_HD_128kbps.mp4
 *
 * Usage:
 *   const playFahh = useFahhSound();
 *   playFahh(); // call when needed
 */
const useFahhSound = () => {
  // Reuse the same Audio instance — avoids creating new objects on every call
  const audioRef = useRef(null);

  if (!audioRef.current) {
    audioRef.current = new Audio("/sounds/fahh.mp4");
    audioRef.current.volume = 0.6; // adjust volume (0.0 – 1.0)
  }

  const playFahh = useCallback(() => {
    try {
      const audio = audioRef.current;
      audio.currentTime = 0; // rewind to start so rapid calls also work
      audio.play().catch((err) => {
        // Browser autoplay policy block — silently ignore
        console.warn("[useFahhSound] Playback blocked:", err);
      });
    } catch (err) {
      console.warn("[useFahhSound] Error:", err);
    }
  }, []);

  return playFahh;
};

export default useFahhSound;
