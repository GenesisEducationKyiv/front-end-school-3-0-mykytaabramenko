import { type SetURLSearchParams, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import {
  DefaultTrackListSearchParams,
  OrderOptions,
  TrackListSearchParams,
  TrackListSortOptions,
} from "../constants.ts";
import type { ListTrackParams, Order, SortOption } from "../api/types/track.ts";

export function useTrackListSearchParams(): [
  ListTrackParams,
  SetURLSearchParams,
] {
  const [searchParams, setSearchParams] = useSearchParams();

  const parsedSearchParams = useMemo(() => {
    const pageSearchParam = searchParams.get(TrackListSearchParams.PAGE);
    const page =
      pageSearchParam !== null
        ? +pageSearchParam
        : DefaultTrackListSearchParams.PAGE;

    const limitSearchParam = searchParams.get(TrackListSearchParams.LIMIT);
    const limit =
      limitSearchParam !== null
        ? +limitSearchParam
        : DefaultTrackListSearchParams.LIMIT;

    const artist = searchParams.get(TrackListSearchParams.ARTIST);
    const genre = searchParams.get(TrackListSearchParams.GENRE);
    const search = searchParams.get(TrackListSearchParams.SEARCH);
    const { sort, order } = getSortAndOrder(searchParams);

    return {
      page,
      limit,
      ...(artist && { artist }),
      ...(genre && { genre }),
      ...(search && { search }),
      ...(sort && { sort, order }),
    };
  }, [searchParams]);

  return [parsedSearchParams, setSearchParams];
}

function isValidSortOption(value: unknown): value is SortOption {
  if (typeof value !== "string") return false;

  const allSortOptions = Object.values(TrackListSortOptions) as SortOption[];
  return allSortOptions.includes(value as SortOption);
}

function isValidOrder(value: unknown): value is Order {
  if (typeof value !== "string") return false;

  const allOrderOptions = Object.values(OrderOptions) as Order[];
  return allOrderOptions.includes(value as Order);
}

function getSortSearchParam(searchParams: URLSearchParams) {
  const sort = searchParams.get(TrackListSearchParams.SORT);
  if (!sort) return null;
  if (!isValidSortOption(sort)) return null;

  return sort;
}

function getOrderSearchParam(searchParams: URLSearchParams) {
  const order = searchParams.get(TrackListSearchParams.ORDER);
  if (!order) return DefaultTrackListSearchParams.ORDER;
  if (!isValidOrder(order)) return DefaultTrackListSearchParams.ORDER;

  return order;
}

type SortAndOrderShape =
  | { sort: SortOption; order: Order }
  | { sort: null; order: null };

function getSortAndOrder(searchParams: URLSearchParams): SortAndOrderShape {
  const sort = getSortSearchParam(searchParams);

  if (!sort) return { sort: null, order: null };

  const order = getOrderSearchParam(searchParams);

  return { sort, order };
}

export default useTrackListSearchParams;
