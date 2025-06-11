import { useNavigate } from "react-router-dom";
import { createTrack } from "../../api/endpoints";
import useHandleMutationResult from "../api/useHandleMutationResult";

export function useCreateTrackMutation() {
  const navigate = useNavigate();
  return useHandleMutationResult({
    queryKey: ["tracks"],
    mutationFn: createTrack,
    toastMessages: {
      successToastMsg: "Track created successfully",
      errorToastMsg: "Failed to create track",
    },
    onSuccess: () => navigate("/tracks"),
  });
}

export default useCreateTrackMutation;
