import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTrack } from "../api/endpoints";
import { useToastContext } from "../components/contexts/ToastContext.ts";
import type { CreateTrackPayload, Track } from "../api/types/track.ts";

export function useCreateTrackMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToastContext();

  function handleSuccess() {
    queryClient.invalidateQueries({ queryKey: ["tracks"] });
    showToast?.({
      message: "Track created successfully",
      severity: "success",
    });
    navigate("/tracks");
  }

  function handleError(error: Error) {
    queryClient.invalidateQueries({ queryKey: ["tracks"] });
    showToast?.({
      message: error?.message || "Failed to create track",
      severity: "error",
    });
  }

  return useMutation<Track, Error, CreateTrackPayload>({
    mutationFn: (vals) => createTrack(vals),
    onSuccess: handleSuccess,
    onError: handleError,
  });
}

export default useCreateTrackMutation;
