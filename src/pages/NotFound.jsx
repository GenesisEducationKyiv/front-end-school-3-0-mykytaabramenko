import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      data-testid="not-found-page"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      p={2}
    >
      <Typography variant="h3" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/tracks")}
        data-testid="not-found-home-button"
      >
        Back to Tracks
      </Button>
    </Box>
  );
}

export default NotFound;
