import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTrack } from "../api/tracks.js";
import { useToastContext } from "../components/contexts/ToastContext.js";
import { useNavigate } from "react-router-dom";

export function useUpdateTrackMutation(track) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToastContext();
  return useMutation({
    mutationFn: (vals) => updateTrack(track.id, vals),
    onSuccess: (updatedTrack) => {
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
      queryClient.setQueryData(["track", track.slug], updatedTrack);
      navigate("/tracks");
      showToast({
        message: "Track updated successfully",
        severity: "success",
      });
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
      showToast({
        message: error?.message || "Failed to update track",
        severity: "error",
      });
    },
  });
}

export default useUpdateTrackMutation;
