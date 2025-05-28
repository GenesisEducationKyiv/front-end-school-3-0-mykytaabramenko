import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import useTrackListSearchParams from "../../../hooks/useTrackListSearchParams.js";
import {
  DefaultTrackListSearchParams,
  TrackListSearchParams,
} from "../../../constants.js";

const OPTIONS = [
  { value: "title", label: "Title" },
  { value: "artist", label: "Artist" },
  { value: "album", label: "Album" },
  { value: "createdAt", label: "Creation time" },
];

export function SortAttributeSelector({ disabled }) {
  const [searchParams, setSearchParams] = useTrackListSearchParams();
  const { sort, order } = searchParams;

  function handleChange(e) {
    const newSort = e.target.value;
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      if (!newSort) {
        newParams.delete(TrackListSearchParams.SORT);
        newParams.delete(TrackListSearchParams.ORDER);
      } else {
        newParams.set(TrackListSearchParams.SORT, newSort);
        newParams.set(
          TrackListSearchParams.ORDER,
          order || DefaultTrackListSearchParams.ORDER,
        );
      }

      newParams.set(
        TrackListSearchParams.PAGE,
        DefaultTrackListSearchParams.PAGE,
      );
      return newParams;
    });
  }

  return (
    <FormControl size="small" sx={{ minWidth: 200 }}>
      <InputLabel id="sort-attribute-label">Sort by</InputLabel>
      <Select
        labelId="sort-attribute-label"
        id="sort-attribute"
        label="Sort by"
        size={"small"}
        value={sort}
        onChange={handleChange}
        data-testid="sort-select"
        disabled={disabled}
        aria-disabled={disabled}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {OPTIONS.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SortAttributeSelector;
