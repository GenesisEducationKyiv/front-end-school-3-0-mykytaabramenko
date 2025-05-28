import { Box } from "@mui/material";

import Filters from "./Filters/Filters.jsx";
import Sorter from "./Sorter/Sorter.jsx";

export function Actions({ disabled }) {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={2} mt={2}>
      <Filters disabled={disabled} />
      <Sorter disabled={disabled} />
    </Box>
  );
}

export default Actions;
