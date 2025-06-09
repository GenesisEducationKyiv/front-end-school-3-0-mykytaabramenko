import { createContext, useContext } from "react";

export const AudioContext = createContext({
  currentId: null,
  setCurrentId: () => {},
});

export function useAudioContext() {
  return useContext(AudioContext);
}
