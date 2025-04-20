import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import useGenres from "../../../hooks/useGenres.js";
import Progress from "../../common/Progress.jsx";
import useTrackListSearchParams from "../../../hooks/useTrackListSearchParams.js";
import {
  DefaultTrackListSearchParams,
  TrackListSearchParams,
} from "../../../constants.js";

export function GenreFilter({ disabled }) {
  const [searchParams, setSearchParams] = useTrackListSearchParams();
  const { data: genres, isLoading } = useGenres();

  const { genre } = searchParams;

  function handleChangeGenre(e) {
    setSearchParams((prev) => {
      const newGenre = e.target.value;
      const newParams = new URLSearchParams(prev);

      if (!newGenre) {
        newParams.delete(TrackListSearchParams.GENRE);
      } else {
        newParams.set(TrackListSearchParams.GENRE, newGenre);
      }

      newParams.set(
        TrackListSearchParams.PAGE,
        DefaultTrackListSearchParams.PAGE,
      );
      return newParams;
    });
  }

  if (isLoading) return <Progress />;

  return (
    <FormControl size="small" sx={{ minWidth: 200 }}>
      <InputLabel id="genre-filter-label">Genre</InputLabel>
      <Select
        labelId="genre-filter-label"
        id="genre-filter"
        label={"Genre"}
        value={genre}
        onChange={handleChangeGenre}
        data-testid={"filter-genre"}
        disabled={disabled}
        aria-disabled={disabled}
      >
        <MenuItem value="">
          <em>All genres</em>
        </MenuItem>
        {genres.map((genre) => (
          <MenuItem value={genre}>{genre}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default GenreFilter;
