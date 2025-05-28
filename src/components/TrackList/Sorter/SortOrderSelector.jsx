import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import useTrackListSearchParams from "../../../hooks/useTrackListSearchParams.js";
import {
  DefaultTrackListSearchParams,
  TrackListSearchParams,
} from "../../../constants.js";

const ORDERS = [
  { value: "asc", label: "Ascending" },
  { value: "desc", label: "Descending" },
];

export function SortOrderSelector({ disabled }) {
  const [searchParams, setSearchParams] = useTrackListSearchParams();
  const { order } = searchParams;

  function handleChange(e) {
    const newOrder = e.target.value;
    setSearchParams((prev) => {
      const newSearchParams = new URLSearchParams(prev);
      newSearchParams.set(TrackListSearchParams.ORDER, newOrder);
      newSearchParams.set(
        TrackListSearchParams.PAGE,
        DefaultTrackListSearchParams.PAGE,
      );
      return newSearchParams;
    });
  }

  return (
    <FormControl size="small" sx={{ minWidth: 200 }}>
      <InputLabel id="sort-order-label">Order</InputLabel>
      <Select
        labelId="sort-order-label"
        id="sort-order"
        label="Order"
        size={"small"}
        value={order}
        onChange={handleChange}
        data-testid="sort-order-select"
        disabled={disabled}
        aria-disabled={disabled}
      >
        {ORDERS.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SortOrderSelector;
