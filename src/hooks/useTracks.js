import { useQuery } from "@tanstack/react-query";
import { loadTracks } from "../api/tracks.js";
import useTrackListSearchParams from "./useTrackListSearchParams.js";

export function useTracks() {
  const [params] = useTrackListSearchParams();

  return useQuery({
    queryKey: ["tracks", params],
    queryFn: () => loadTracks(params),
  });
}
