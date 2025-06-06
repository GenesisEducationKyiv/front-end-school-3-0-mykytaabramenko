import type { AlertProps } from "@mui/material/Alert";
import type { ReactNode } from "react";

export type AlertSeverity = AlertProps["severity"];

export interface ToastOptions {
  message: ReactNode;
  severity: AlertSeverity;
}

export interface ToastContextValue {
  open: boolean;
  showToast?: (options: ToastOptions) => void;
  hideToast?: (reason: string) => void;
}
