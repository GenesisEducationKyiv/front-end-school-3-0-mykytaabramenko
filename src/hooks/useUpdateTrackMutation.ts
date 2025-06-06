import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTrack } from "../api/endpoints";
import { useToastContext } from "../components/contexts/ToastContext.ts";
import { useNavigate } from "react-router-dom";
import type { Track, UpdateTrackPayload } from "../api/types/track.ts";

export function useUpdateTrackMutation(track: Track) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToastContext();

  function handleSuccess(updatedTrack: Track) {
    queryClient.invalidateQueries({ queryKey: ["tracks"] });
    queryClient.setQueryData(["track", track.slug], updatedTrack);
    navigate("/tracks");
    showToast?.({
      message: "Track updated successfully",
      severity: "success",
    });
  }

  function handleError(error: Error) {
    queryClient.invalidateQueries({ queryKey: ["tracks"] });
    showToast?.({
      message: error?.message || "Failed to update track",
      severity: "error",
    });
  }

  return useMutation<Track, Error, UpdateTrackPayload>({
    mutationFn: (vals) => updateTrack(track.id, vals),
    onSuccess: handleSuccess,
    onError: handleError,
  });
}

export default useUpdateTrackMutation;
