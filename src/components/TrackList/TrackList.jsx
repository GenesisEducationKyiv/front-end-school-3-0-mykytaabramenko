import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

import TrackRow from "./TrackRow.jsx";
import useTrackListSearchParams from "../../hooks/useTrackListSearchParams.js";
import { TrackListSearchParams } from "../../constants.js";

const headerCells = [
  { label: "" },
  { label: "Image", align: "center" },
  { label: "Title" },
  { label: "Artist" },
  { label: "Album" },
  { label: "Genres" },
  { label: "Actions", align: "center" },
];

export function TrackList({ isFetching, tracks, meta }) {
  const [searchParams, setSearchParams] = useTrackListSearchParams();

  const { page } = searchParams;

  function handlePageChange(e, newPage) {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set(TrackListSearchParams.PAGE, `${newPage + 1}`);
      return newParams;
    });
  }

  function handleRowsPerPageChange(e) {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set(TrackListSearchParams.LIMIT, e.target.value);
      return newParams;
    });
  }

  if (isFetching)
    return (
      <Box display={"flex"} justifyContent={"center"}>
        <CircularProgress data-testid="loading-tracks" />
      </Box>
    );

  return (
    <Table>
      <TableHead>
        <TableRow>
          {headerCells.map(({ label, align }) => (
            <TableCell key={label} align={align}>
              {label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {tracks.map((track) => (
          <TrackRow key={track.id} track={track} />
        ))}
      </TableBody>
      <TablePagination
        page={page - 1}
        onPageChange={handlePageChange}
        count={meta.total}
        rowsPerPage={meta.limit}
        onRowsPerPageChange={handleRowsPerPageChange}
        data-testid="pagination"
        slotProps={{
          actions: {
            previousButton: {
              "data-testid": "pagination-prev",
            },
            nextButton: {
              "data-testid": "pagination-next",
            },
          },
        }}
      />
    </Table>
  );
}

export default TrackList;
