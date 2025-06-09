import { type SetURLSearchParams, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import {
  DefaultTrackListSearchParams,
  OrderOptions,
  TrackListSearchParams,
  TrackListSortOptions,
} from "../constants";
import type { ListTrackParams, Order, SortOption } from "../api/types/track";

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

function isValidSearchParameter<T>(value: unknown, options: T[]): value is T {
  if (typeof value !== "string") return false;

  return options.includes(value as T);
}

function getValidatedSearchParam<T>(
  searchParams: URLSearchParams,
  key: string,
  validator: (value: unknown) => value is T,
): T | null;

function getValidatedSearchParam<T>(
  searchParams: URLSearchParams,
  key: string,
  validator: (value: unknown) => value is T,
  defaultValue: T,
): T;

function getValidatedSearchParam<T>(
  searchParams: URLSearchParams,
  key: string,
  validator: (value: unknown) => value is T,
  defaultValue: T | null = null,
): T | null {
  const param = searchParams.get(key);
  if (!param) return defaultValue;
  if (!validator(param)) return defaultValue;

  return param;
}

type SortAndOrderShape =
  | { sort: SortOption; order: Order }
  | { sort: null; order: null };

function getSortAndOrder(searchParams: URLSearchParams): SortAndOrderShape {
  const sort = getValidatedSearchParam(searchParams, "sort", (value) =>
    isValidSearchParameter(value, Object.values(TrackListSortOptions)),
  );

  if (!sort) return { sort: null, order: null };

  const order = getValidatedSearchParam(
    searchParams,
    "order",
    (value) => isValidSearchParameter(value, Object.values(OrderOptions)),
    DefaultTrackListSearchParams.ORDER,
  );

  return { sort, order };
}

export default useTrackListSearchParams;
