import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

export function DeleteDialog({ open, onClose, title, onConfirmDelete }) {
  return (
    <Dialog open={open} onClose={onClose} data-testid="confirm-dialog">
      <DialogTitle>Do you really want to delete "{title}"?</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} data-testid="cancel-delete">
          Cancel
        </Button>
        <Button
          onClick={onConfirmDelete}
          data-testid="confirm-delete"
          color="error"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;
