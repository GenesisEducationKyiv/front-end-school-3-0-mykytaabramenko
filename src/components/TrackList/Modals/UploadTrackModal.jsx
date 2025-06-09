import { Typography } from "@mui/material";

import Modal from "../../common/Modal.jsx";
import useTrack from "../../../hooks/useTrack.js";
import Progress from "../../common/Progress.jsx";
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
