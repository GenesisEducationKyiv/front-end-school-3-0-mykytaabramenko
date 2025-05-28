import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "./useDebounce.js";
import {
  DefaultTrackListSearchParams,
  TrackListSearchParams,
} from "../constants.js";

export function useDebouncedUpdateInUrl(key, value, defaultValue = "") {
  const [searchParams, setSearchParams] = useSearchParams();
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const currentValue = searchParams.get(key) || defaultValue;
    if (debouncedValue === currentValue) return;

    const newParams = new URLSearchParams(searchParams);
    if (debouncedValue) {
      newParams.set(key, debouncedValue);
    } else {
      newParams.delete(key);
    }

    newParams.set(
      TrackListSearchParams.PAGE,
      DefaultTrackListSearchParams.PAGE,
    );
    setSearchParams(newParams);
  }, [debouncedValue, setSearchParams, searchParams, key, value, defaultValue]);
}

export default useDebouncedUpdateInUrl;
