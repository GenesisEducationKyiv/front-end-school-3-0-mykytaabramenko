import { useQuery, useQueryClient } from "@tanstack/react-query";
import { loadTrackBySlug } from "../api/endpoints";
import { useParams } from "react-router-dom";
import useTrackListSearchParams from "./useTrackListSearchParams.ts";
import type { TrackListResponse } from "../api/types/track.ts";

export function useTrack() {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  const [trackListSearchParams] = useTrackListSearchParams();
  const listKey = ["tracks", trackListSearchParams];

  const cached = queryClient.getQueryData<TrackListResponse>(listKey);
  const fromList = cached?.data?.find((t) => String(t.slug) === slug);

  return useQuery({
    queryKey: ["track", slug],
    queryFn: () => loadTrackBySlug(slug as string),
    initialData: fromList,
    enabled: !!slug && !fromList,
    staleTime: fromList ? Infinity : 0,
  });
}

export default useTrack;
