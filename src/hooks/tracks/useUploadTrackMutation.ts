import { uploadTrack } from "../../api/endpoints";
import type { Track, UploadTrackPayload } from "../../api/types/track";
import useHandleMutationResult from "../api/useHandleMutationResult";
import { useNavigate } from "react-router-dom";

interface UploadTrackMutationInput extends UploadTrackPayload {
  id: Track["id"];
}

export function useUploadTrackMutation() {
  const navigate = useNavigate();
  return useHandleMutationResult<Track, UploadTrackMutationInput>({
    queryKey: ["tracks"],
    mutationFn: async (data: UploadTrackMutationInput) => {
      const { id, ...restData } = data;
      return await uploadTrack(id, restData);
    },
    toastMessages: {
      successToastMsg: "Track uploaded successfully",
      errorToastMsg: "Failed to upload track",
    },
    onSuccess: () => navigate("/tracks"),
  });
}

export default useUploadTrackMutation;
