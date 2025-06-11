import { Typography } from "@mui/material";

import Modal from "../../common/Modal";
import useTrack from "../../../hooks/tracks/useTrack";
import Progress from "../../common/Progress";
import UploadTrackForm from "../UploadForm/UploadForm";

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
