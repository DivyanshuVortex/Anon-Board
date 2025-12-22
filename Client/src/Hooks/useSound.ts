import { useCallback } from "react";
import biwaSound from "../assets/nakime_biwa.mp3";

export const useSound = () => {
  const play = useCallback(() => {
    const isSoundEnabled = localStorage.getItem("soundEnabled") === "true";
    if (!isSoundEnabled) return;

    try {
      const audio = new Audio(biwaSound);
      audio.volume = 0.2; 
      audio.currentTime = 0;
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Audio playback interrupted", error);
        });
      }
    } catch (error) {
      console.error("Audio playback failed", error);
    }
  }, []);

  return play;
};
