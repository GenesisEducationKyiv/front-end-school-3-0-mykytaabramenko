import { useForm } from "react-hook-form";
import { Button, Box } from "@mui/material";

import useGenres from "../../../hooks/useGenres.js";
import GenresInput from "./GenresInput.jsx";
import TextInput from "../../common/TextInput.jsx";
import Progress from "../../common/Progress.jsx";
import { validateImageUrl } from "../../../utils.js";

export function TrackForm({
  defaultValues = {
    title: "",
    artist: "",
    album: "",
    genres: [],
    coverImage: "",
  },
  onSubmit,
  isSubmitting = false,
}) {
  const genresQuery = useGenres();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const isSubmitButtonDisabled = isSubmitting || Object.keys(errors).length > 0;

  async function handleValidateImageURL(value) {
    if (!value) return true;
    return await validateImageUrl(value);
  }

  if (genresQuery.isLoading) {
    return <Progress />;
  }

  return (
    <Box
      component={"form"}
      data-testid="track-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        required
        label={"Title"}
        {...register("title", { required: "Title is required" })}
        error={!!errors.title}
        helperText={errors.title?.message}
        inputProps={{
          "data-testid": "input-title",
        }}
        FormHelperTextProps={{ "data-testid": "error-title" }}
      />
      <TextInput
        required
        label={"Artist"}
        {...register("artist", { required: "Artist is required" })}
        error={!!errors.artist}
        helperText={errors.artist?.message}
        inputProps={{
          "data-testid": "input-artist",
        }}
        FormHelperTextProps={{ "data-testid": "error-artist" }}
      />
      <TextInput
        label={"Album"}
        {...register("album")}
        inputProps={{
          "data-testid": "input-album",
        }}
      />

      <GenresInput control={control} />

      <TextInput
        label={"Cover Image URL"}
        {...register("coverImage", { validate: handleValidateImageURL })}
        inputProps={{
          "data-testid": "input-cover-image",
        }}
        error={!!errors.coverImage}
        helperText={errors.coverImage?.message}
        FormHelperTextProps={{ "data-testid": "error-cover-image" }}
      />

      <Box mt={3} textAlign="right">
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitButtonDisabled}
          aria-disabled={isSubmitButtonDisabled}
          data-testid="submit-button"
        >
          {isSubmitting ? "Saving…" : "Save"}
        </Button>
      </Box>
    </Box>
  );
}

export default TrackForm;
