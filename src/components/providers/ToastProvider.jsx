import { useState } from "react";
import { ToastContext } from "../contexts/ToastContext.js";

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ open: false });

  function showToast({ message, severity }) {
    setToast({
      open: true,
      severity,
      message,
    });
  }

  function hideToast(_, reason) {
    if (reason === "clickaway") return;
    setToast((prev) => ({
      ...prev,
      open: false,
    }));
  }

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
