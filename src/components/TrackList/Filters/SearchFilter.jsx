import { useState } from "react";
import { TextField } from "@mui/material";

import useDebouncedUpdateInUrl from "../../../hooks/useDebouncedUpdateInUrl.js";
import { TrackListSearchParams } from "../../../constants.js";

export function SearchFilter() {
  const [search, setSearch] = useState("");
  useDebouncedUpdateInUrl(TrackListSearchParams.SEARCH, search);

  function handleChangeSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <TextField
      label={"Search"}
      value={search}
      onChange={handleChangeSearch}
      size={"small"}
      inputProps={{
        "data-testid": "search-input",
      }}
    />
  );
}

export default SearchFilter;
