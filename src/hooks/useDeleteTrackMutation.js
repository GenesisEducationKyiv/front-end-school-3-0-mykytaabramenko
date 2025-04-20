import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTrack } from "../api/tracks.js";
import { useToastContext } from "../components/contexts/ToastContext.js";

export function useDeleteTrackMutation(id) {
  const queryClient = useQueryClient();
  const { showToast } = useToastContext();

  return useMutation({
    mutationFn: () => deleteTrack(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
      showToast({
        message: "Track deleted successfully",
        severity: "success",
      });
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
      showToast({
        message: error?.message || "Failed to delete track",
        severity: "error",
      });
    },
  });
}

export default useDeleteTrackMutation;
