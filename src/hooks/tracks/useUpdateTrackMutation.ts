import { updateTrack } from "../../api/endpoints";
import { useNavigate } from "react-router-dom";
import type { Track, UpdateTrackPayload } from "../../api/types/track";
import useHandleMutationResult from "../useHandleMutationResult";

interface UpdateTrackMutationInput extends UpdateTrackPayload {
  id: Track["id"];
}

export function useUpdateTrackMutation() {
  const navigate = useNavigate();
  return useHandleMutationResult<Track, UpdateTrackMutationInput>({
    queryKey: ["tracks"],
    mutationFn: async (vals) => {
      const { id, ...restData } = vals;
      return await updateTrack(id, restData);
    },
    toastMessages: {
      successToastMsg: "Track updated successfully",
      errorToastMsg: "Failed to update track",
    },
    onSuccess: () => navigate("/tracks"),
  });
}

export default useUpdateTrackMutation;
