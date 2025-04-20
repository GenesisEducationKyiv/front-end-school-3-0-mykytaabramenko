import { Box, Typography } from "@mui/material";

import GenreFilter from "./GenreFilter.jsx";
import ArtistFilter from "./ArtistFilter.jsx";
import SearchFilter from "./SearchFilter.jsx";

export function Filters({ disabled }) {
  return (
    <>
      <Typography variant={"h6"}>Filters</Typography>
      <Box display={"flex"} gap={2} alignItems={"center"}>
        <ArtistFilter />
        <GenreFilter disabled={disabled} />
        <SearchFilter />
      </Box>
    </>
  );
}

export default Filters;
