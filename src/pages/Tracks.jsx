import { Box, Typography } from "@mui/material";

import TrackList from "../components/trackList/TrackList";
import Actions from "../components/trackList/Actions";
import AudioProvider from "../components/providers/AudioProvider";
import CreateButton from "../components/TrackList/CreateButton";
import { useTracks } from "../hooks/tracks/useTracks";

function Tracks() {
  const { isFetching, data: { data: tracks, meta } = {} } = useTracks();

  return (
    <div>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant={"h2"} data-testid="tracks-header">
          Tracks
        </Typography>
        <CreateButton />
      </Box>
      <Actions disabled={isFetching} />
      <AudioProvider>
        <TrackList isFetching={isFetching} tracks={tracks} meta={meta} />
      </AudioProvider>
    </div>
  );
}

export default Tracks;
