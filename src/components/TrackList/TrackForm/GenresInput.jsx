import { Controller } from "react-hook-form";
import { Autocomplete, Chip } from "@mui/material";

import useGenres from "../../../hooks/useGenres.js";
import Progress from "../../common/Progress.jsx";
import TextInput from "../../common/TextInput.jsx";

export function GenresInput({ control }) {
  const { isLoading, data } = useGenres();

  function renderValue(valueList, getItemProps) {
    return valueList.map((opt, idx) => (
      <Chip
        key={opt}
        label={opt}
        {...getItemProps({ index: idx })}
        data-testid={`genre-tag-${opt}`}
      />
    ));
  }

  function renderInput(params) {
    return (
      <TextInput
        {...params}
        label="Genres"
        inputProps={{ ...params.inputProps, "data-testid": "genre-selector" }}
      />
    );
  }

  function renderAutocomplete({ field }) {
    return (
      <Autocomplete
        multiple
        options={data}
        getOptionLabel={(opt) => opt}
        value={field.value || []}
        onChange={(_, v) => field.onChange(v)}
        renderValue={renderValue}
        renderInput={renderInput}
      />
    );
  }

  if (isLoading) {
    return <Progress />;
  }

  return (
    <Controller control={control} name={"genres"} render={renderAutocomplete} />
  );
}

export default GenresInput;
