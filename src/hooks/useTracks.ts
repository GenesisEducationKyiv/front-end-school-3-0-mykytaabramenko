import { useQuery } from "@tanstack/react-query";
import useTrackListSearchParams from "./useTrackListSearchParams.ts";
import { listTracks } from "../api/endpoints";

export function useTracks() {
  const [params] = useTrackListSearchParams();

  return useQuery({
    queryKey: ["tracks", params],
    queryFn: () => listTracks(params),
  });
}
