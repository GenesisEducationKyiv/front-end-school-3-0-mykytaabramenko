import { Alert, Snackbar } from "@mui/material";

export function Toast({ open, onClose, severity, message }) {
  return (
    <Snackbar open={open} onClose={onClose} data-testid="toast-container">
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
