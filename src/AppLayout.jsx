import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Toast from "./components/common/Toast.jsx";
import { useToastContext } from "./components/contexts/ToastContext.js";

export default function AppLayout() {
  const { toast, hideToast } = useToastContext();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        component="main"
        sx={{
          flex: 1,
          p: { xs: 4, sm: 6 },
          overflow: "auto",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "3.2rem",
          }}
        >
          <Outlet />
        </Container>
      </Box>
      <Toast
        open={toast.open}
        onClose={hideToast}
        message={toast.message}
        severity={toast.severity}
      />
    </Box>
  );
}
