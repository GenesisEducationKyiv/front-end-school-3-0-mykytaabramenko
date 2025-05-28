import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadTrack } from "../api/tracks.js";
import { useToastContext } from "../components/contexts/ToastContext.js";
import { useNavigate } from "react-router-dom";

export function useUploadTrackMutation(id) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useToastContext();

  return useMutation({
    mutationFn: (data) => uploadTrack(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
      showToast({
        message: "Track uploaded successfully",
        severity: "success",
      });
      navigate(`/tracks`);
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
      showToast({
        message: error?.message || "Failed to upload track",
        severity: "error",
      });
    },
  });
}

export default useUploadTrackMutation;
