import { Button, Typography, Box } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

export function FileUploadButton({ onFileSelected, fileName }) {
  return (
    <Box textAlign="center">
      <Button
        variant="contained"
        component="label"
        startIcon={<UploadIcon />}
        data-testid="upload-input"
      >
        {fileName || "Choose file"}
        <input
          type="file"
          hidden
          accept="audio/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFileSelected(file);
          }}
        />
      </Button>

      {fileName && (
        <Typography variant="caption" mt={1} display="block">
          Selected: {fileName}
        </Typography>
      )}
    </Box>
  );
}

export default FileUploadButton;
