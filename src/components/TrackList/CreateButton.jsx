import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export function CreateButton() {
  const navigate = useNavigate();
  const location = useLocation();

  function handleClick() {
    navigate("/tracks/create", {
      state: {
        background: {
          pathname: location.pathname,
          search: location.search,
          hash: location.hash,
        },
      },
    });
  }

  return (
    <Button
      onClick={handleClick}
      variant={"contained"}
      size={"medium"}
      data-testid="create-track-button"
    >
      Create
    </Button>
  );
}

export default CreateButton;
