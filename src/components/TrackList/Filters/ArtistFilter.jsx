import { useState } from "react";
import { TextField } from "@mui/material";

import useDebouncedUpdateInUrl from "../../../hooks/useDebouncedUpdateInUrl.js";
import { TrackListSearchParams } from "../../../constants.js";

export function ArtistFilter() {
  const [artist, setArtist] = useState("");
  useDebouncedUpdateInUrl(TrackListSearchParams.ARTIST, artist);

  function handleChangeArtist(e) {
    setArtist(e.target.value);
  }

  return (
    <TextField
      label={"Artist"}
      value={artist}
      onChange={handleChangeArtist}
      size={"small"}
      inputProps={{
        "data-testid": "filter-artist",
      }}
    />
  );
}

export default ArtistFilter;
