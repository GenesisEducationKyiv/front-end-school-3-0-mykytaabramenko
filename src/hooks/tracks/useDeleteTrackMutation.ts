import { deleteTrack } from "../../api/endpoints";
import useHandleMutationResult from "../api/useHandleMutationResult";

export function useDeleteTrackMutation() {
  return useHandleMutationResult({
    queryKey: ["tracks"],
    mutationFn: deleteTrack,
    toastMessages: {
      successToastMsg: "Track deleted successfully",
      errorToastMsg: "Failed to delete track",
    },
  });
}

export default useDeleteTrackMutation;
