import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadTrack } from "../api/endpoints";
import { useToastContext } from "../components/contexts/ToastContext.ts";
import { useNavigate } from "react-router-dom";
import type { Track, UploadTrackPayload } from "../api/types/track.ts";

export function useUploadTrackMutation(id: Track["id"]) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useToastContext();

  function handleSuccess() {
    queryClient.invalidateQueries({ queryKey: ["tracks"] });
    showToast?.({
      message: "Track uploaded successfully",
      severity: "success",
    });
    navigate(`/tracks`);
  }

  function handleError(error: Error) {
    queryClient.invalidateQueries({ queryKey: ["tracks"] });
    showToast?.({
      message: error?.message || "Failed to upload track",
      severity: "error",
    });
  }

  return useMutation({
    mutationFn: (data: UploadTrackPayload) => uploadTrack(id, data),
    onSuccess: handleSuccess,
    onError: handleError,
  });
}

export default useUploadTrackMutation;
