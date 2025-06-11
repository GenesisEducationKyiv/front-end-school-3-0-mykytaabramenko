import { useQuery, useQueryClient } from "@tanstack/react-query";
import { loadTrackBySlug } from "../../api/endpoints";
import { useParams } from "react-router-dom";
import useTrackListSearchParams from "./useTrackListSearchParams";
import type { TrackListResponse } from "../../api/types/track";

export function useTrack() {
  const slug = useTrackSlug();
  const queryClient = useQueryClient();

  const [trackListSearchParams] = useTrackListSearchParams();
  const listKey = ["tracks", trackListSearchParams];

  const cached = queryClient.getQueryData<TrackListResponse>(listKey);
  const fromList = cached?.data?.find((t) => String(t.slug) === slug);

  return useQuery({
    queryKey: ["track", slug],
    queryFn: () => loadTrackBySlug(slug),
    initialData: fromList,
    enabled: !!slug && !fromList,
    staleTime: fromList ? Infinity : 0,
  });
}

function useTrackSlug() {
  const { slug } = useParams();
  if (!slug) {
    throw new Error("Track slug is required");
  }
  return slug;
}

export default useTrack;
