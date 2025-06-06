import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTrack } from "../api/endpoints";
import { useToastContext } from "../components/contexts/ToastContext.ts";
import type { Track } from "../api/types/track.ts";

export function useDeleteTrackMutation() {
  const queryClient = useQueryClient();
  const { showToast } = useToastContext();

  function handleSuccess() {
    queryClient.invalidateQueries({ queryKey: ["tracks"] });
    showToast?.({
      message: "Track deleted successfully",
      severity: "success",
    });
  }

  function handleError(error: Error) {
    queryClient.invalidateQueries({ queryKey: ["tracks"] });
    showToast?.({
      message: error?.message || "Failed to delete track",
      severity: "error",
    });
  }

  return useMutation<void, Error, Track["id"]>({
    mutationFn: (id) => deleteTrack(id),
    onSuccess: handleSuccess,
    onError: handleError,
  });
}

export default useDeleteTrackMutation;
