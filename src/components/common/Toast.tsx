import { Alert, Snackbar, type AlertProps } from "@mui/material";
import type { AlertSeverity } from "../../types/toast.ts";
import type { ReactNode } from "react";

interface ToastProps {
  open: boolean;
  onClose: AlertProps["onClose"];
  severity: AlertSeverity;
  message: ReactNode;
}

export function Toast({ open, onClose, severity, message }: ToastProps) {
  return (
    <Snackbar open={open} data-testid="toast-container">
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{ width: "100%" }}
        data-testid={`toast-${severity}`}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Toast;
