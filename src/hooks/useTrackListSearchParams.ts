import { type SetURLSearchParams, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import {
  DefaultTrackListSearchParams,
  OrderOptions,
  TrackListSearchParams,
  TrackListSortOptions,
} from "../constants";
import { O, pipe } from "@mobily/ts-belt";
import type { ListTrackParams, Order, SortOption } from "../api/types/track";

type NumberParamKeys =
  | typeof TrackListSearchParams.PAGE
  | typeof TrackListSearchParams.LIMIT;

type SortAndOrderShape =
  | { sort: SortOption; order: Order }
  | { sort: null; order: null };

export function useTrackListSearchParams(): [
  ListTrackParams,
  SetURLSearchParams,
] {
  const [searchParams, setSearchParams] = useSearchParams();

  const parsedSearchParams = useMemo(() => {
    const page = getNumberParam(
      searchParams,
      TrackListSearchParams.PAGE,
      DefaultTrackListSearchParams.PAGE,
    );

    const limit = getNumberParam(
      searchParams,
      TrackListSearchParams.LIMIT,
      DefaultTrackListSearchParams.LIMIT,
    );

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

function getNumberParam(
  searchParams: URLSearchParams,
  key: NumberParamKeys,
  defaultValue: number,
) {
  return pipe(
    O.fromNullable(searchParams.get(key)),
    O.flatMap((value) => {
      const n = Number(value);
      return Number.isNaN(n) ? O.None : O.Some(n);
    }),
    O.getWithDefault(defaultValue),
  );
}

function getValidatedSearchParam<T>(
  searchParams: URLSearchParams,
  key: string,
  validOptions: T[],
): O.Option<T> {
  return pipe(
    O.fromNullable(searchParams.get(key)),
    O.flatMap((value) =>
      isValidSearchParameter(value, validOptions) ? O.Some(value) : O.None,
    ),
  );
}

function getSortAndOrder(searchParams: URLSearchParams): SortAndOrderShape {
  return pipe(
    getValidatedSearchParam(
      searchParams,
      TrackListSearchParams.SORT,
      Object.values(TrackListSortOptions),
    ),
    O.match<SortOption, SortAndOrderShape>(
      (sort) => {
        const order = pipe(
          getValidatedSearchParam(
            searchParams,
            TrackListSearchParams.ORDER,
            Object.values(OrderOptions),
          ),
          (value) =>
            O.getWithDefault(value, DefaultTrackListSearchParams.ORDER),
        );

        return { sort, order };
      },
      () => ({ sort: null, order: null }),
    ),
  );
}

export default useTrackListSearchParams;
