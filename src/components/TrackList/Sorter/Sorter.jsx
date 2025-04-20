import { Box, Typography } from "@mui/material";

import SortAttributeSelector from "./SortAttributeSelector.jsx";
import SortOrderSelector from "./SortOrderSelector.jsx";

export function Sorter({ disabled }) {
  return (
    <>
      <Typography variant={"h6"}>Sorter</Typography>
      <Box display="flex" gap={2} data-testid="sorters-container">
        <SortAttributeSelector disabled={disabled} />
        <SortOrderSelector disabled={disabled} />
      </Box>
    </>
  );
}

export default Sorter;
