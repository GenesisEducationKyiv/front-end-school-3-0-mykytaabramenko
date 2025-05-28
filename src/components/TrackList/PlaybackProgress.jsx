import { LinearProgress } from "@mui/material";

export function PlaybackProgress({ progress, id }) {
  return (
    <LinearProgress
      variant="determinate"
      value={progress}
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 4,
        borderRadius: "4px",
      }}
      data-testid={`audio-progress-${id}`}
    />
  );
}

export default PlaybackProgress;
