import { useQuery, useQueryClient } from "@tanstack/react-query";
import { loadTrack } from "../api/tracks.js";
import { useParams } from "react-router-dom";
import useTrackListSearchParams from "./useTrackListSearchParams.js";

export function useTrack() {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  const [trackListSearchParams] = useTrackListSearchParams();
  const listKey = ["tracks", trackListSearchParams];

  const cached = queryClient.getQueryData(listKey);
  const fromList = cached?.data?.find((t) => String(t.slug) === slug);

  return useQuery({
    queryKey: ["track", slug],
    queryFn: () => loadTrack(slug),
    initialData: fromList,
    enabled: !fromList,
    staleTime: fromList ? Infinity : 0,
  });
}

export default useTrack;
