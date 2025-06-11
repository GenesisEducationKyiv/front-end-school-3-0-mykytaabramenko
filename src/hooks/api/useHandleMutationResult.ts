import {
  type MutationFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useToastContext } from "../../components/contexts/ToastContext";
import type { ToastOptions } from "../../types/toast";

interface HandleMutationResultOptions<TData, TPayload> {
  queryKey: string[];
  mutationFn: MutationFunction<TData, TPayload>;
  toastMessages: {
    successToastMsg?: ToastOptions["message"];
    errorToastMsg?: ToastOptions["message"];
  };
  onSuccess?: () => unknown;
}

export function useHandleMutationResult<TData, TPayload>({
  queryKey,
  mutationFn,
  toastMessages: { successToastMsg, errorToastMsg },
  onSuccess,
}: HandleMutationResultOptions<TData, TPayload>) {
  const queryClient = useQueryClient();
  const { showToast } = useToastContext();

  function handleSuccess() {
    queryClient.invalidateQueries({ queryKey });
    showToast?.({
      message: successToastMsg,
      severity: "success",
    });
    onSuccess?.();
  }

  function handleError(error: Error) {
    queryClient.invalidateQueries({ queryKey: ["tracks"] });
    showToast?.({
      message: error?.message || errorToastMsg,
      severity: "error",
    });
  }

  return useMutation<TData, Error, TPayload>({
    mutationFn,
    onSuccess: handleSuccess,
    onError: handleError,
  });
}

export default useHandleMutationResult;
