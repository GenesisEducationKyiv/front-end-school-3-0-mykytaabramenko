import { Typography } from "@mui/material";

import Modal from "../../common/Modal.tsx";
import useTrack from "../../../hooks/useTrack.ts";
import Progress from "../../common/Progress.tsx";
import UploadTrackForm from "../UploadForm/UploadForm.jsx";

export function UploadTrackModal() {
  const { data: track, isLoading, isError } = useTrack();

  if (isLoading) return <Progress />;
  if (isError) {
    return <Typography color="error">Failed to load track.</Typography>;
  }

  return (
    <Modal header={"Upload track"}>
      <UploadTrackForm trackId={track.id} />
    </Modal>
  );
}

export default UploadTrackModal;
