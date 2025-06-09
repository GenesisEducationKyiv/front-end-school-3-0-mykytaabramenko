import { useEffect, useRef, useState } from "react";

import { useAudioContext } from "../contexts/AudioContext.js";
import { PlaybackStates } from "../../constants.js";
import { getPlaybackUri } from "../../utils.js";

export function useAudioEffects(audioFile, id) {
  const [playbackData, setPlaybackData] = useState({ progress: 0, state: "" });
  const audioRef = useRef(new Audio(getPlaybackUri(audioFile)));
  const { currentId, setCurrentId } = useAudioContext();
  const isCurrentTrackActive = currentId === id;

  useEffect(() => {
    const audio = audioRef.current;
    function handleEnded() {
      setPlaybackData((prev) => ({ ...prev, state: PlaybackStates.ENDED }));
    }

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  const prevActive = useRef(isCurrentTrackActive);
  useEffect(() => {
    const audio = audioRef.current;
    if (prevActive.current && !isCurrentTrackActive) {
      audio.pause();
      audio.currentTime = 0;
      setPlaybackData({ progress: 0, state: "" });
    }
    prevActive.current = isCurrentTrackActive;
  }, [isCurrentTrackActive]);

  useEffect(() => {
    const audio = audioRef.current;
    const onTimeUpdate = () => {
      if (audio.duration) {
        setPlaybackData((prev) => ({
          ...prev,
          progress: (audio.currentTime / audio.duration) * 100,
        }));
      }
    };
    audio.addEventListener("timeupdate", onTimeUpdate);
    return () => audio.removeEventListener("timeupdate", onTimeUpdate);
  }, []);

  return { playbackData, setPlaybackData, setCurrentId, audioRef };
}

export default useAudioEffects;
