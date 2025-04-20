import { useNavigate } from "react-router-dom";
import { Modal as MUIModal, Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export function Modal({ children, header }) {
  const navigate = useNavigate();

  function handleCloseModal() {
    navigate(-1);
  }

  return (
    <MUIModal open onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 1,
          width: 400,
          boxShadow: 24,
        }}
      >
        <IconButton
          onClick={handleCloseModal}
          sx={{ position: "absolute", top: 8, right: 8 }}
          data-testid="close-edit-modal"
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" gutterBottom>
          {header}
        </Typography>
        {children}
      </Box>
    </MUIModal>
  );
}

export default Modal;
