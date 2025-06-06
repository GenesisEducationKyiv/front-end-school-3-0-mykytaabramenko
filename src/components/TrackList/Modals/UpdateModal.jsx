import { Typography } from "@mui/material";

import Modal from "../../common/Modal.tsx";
import useTrack from "../../../hooks/useTrack.ts";
import Progress from "../../common/Progress.tsx";
import TrackForm from "../TrackForm/TrackForm.jsx";
import useUpdateTrackMutation from "../../../hooks/useUpdateTrackMutation.ts";

export function UpdateModal() {
  const { data: track, isLoading, isError } = useTrack();
  const updateMutation = useUpdateTrackMutation(track);

  function handleSubmit(values) {
    return updateMutation.mutate(values);
  }

  if (isLoading) return <Progress />;
  if (isError) {
    return <Typography color="error">Failed to load track.</Typography>;
  }

  const defaults = {
    title: track.title,
    artist: track.artist,
    album: track.album,
    genres: track.genres,
    coverImage: track.coverImage || "",
  };

  return (
    <Modal header={"Edit track"}>
      <TrackForm
        defaultValues={defaults}
        onSubmit={handleSubmit}
        isSubmitting={updateMutation.isLoading}
      />
    </Modal>
  );
}

export default UpdateModal;
