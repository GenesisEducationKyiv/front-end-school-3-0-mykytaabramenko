import { useSearchParams } from "react-router-dom";
import {
  DefaultTrackListSearchParams,
  TrackListSearchParams,
} from "../constants.js";

export function useTrackListSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page =
    +searchParams.get(TrackListSearchParams.PAGE) ||
    DefaultTrackListSearchParams.PAGE;
  const limit =
    +searchParams.get(TrackListSearchParams.LIMIT) ||
    DefaultTrackListSearchParams.LIMIT;
  const artist = searchParams.get(TrackListSearchParams.ARTIST) || "";
  const genre = searchParams.get(TrackListSearchParams.GENRE) || "";
  const search = searchParams.get(TrackListSearchParams.SEARCH) || "";
  const sort = searchParams.get(TrackListSearchParams.SORT) || "";
  const order =
    searchParams.get(TrackListSearchParams.ORDER) ||
    DefaultTrackListSearchParams.ORDER;

  return [
    {
      page,
      limit,
      ...(artist && { artist }),
      ...(genre && { genre }),
      ...(search && { search }),
      ...(sort && { sort, order }),
    },
    setSearchParams,
  ];
}

export default useTrackListSearchParams;
