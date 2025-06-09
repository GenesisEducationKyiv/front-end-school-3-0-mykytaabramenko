import { createContext, useContext } from "react";
import type { ToastContextValue } from "../../types/toast";

export const ToastContext = createContext<ToastContextValue>({
  open: false,
});

export function useToastContext() {
  return useContext(ToastContext);
}
