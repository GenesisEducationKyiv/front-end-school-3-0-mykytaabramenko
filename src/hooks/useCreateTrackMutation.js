import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTrack } from "../api/tracks.js";
import { useToastContext } from "../components/contexts/ToastContext.js";

export function useCreateTrackMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToastContext();

  return useMutation({
    mutationFn: (vals) => createTrack(vals),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
      showToast({
        message: "Track created successfully",
        severity: "success",
      });
      navigate("/tracks");
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
      showToast({
        message: error?.message || "Failed to create track",
        severity: "error",
      });
    },
  });
}

export default useCreateTrackMutation;
