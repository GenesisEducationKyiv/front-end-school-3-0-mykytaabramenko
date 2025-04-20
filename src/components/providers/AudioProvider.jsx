import { useState } from "react";
import { AudioContext } from "../contexts/AudioContext.js";

export function AudioProvider({ children }) {
  const [currentId, setCurrentId] = useState(null);
  return (
    <AudioContext.Provider value={{ currentId, setCurrentId }}>
      {children}
    </AudioContext.Provider>
  );
}

export default AudioProvider;
