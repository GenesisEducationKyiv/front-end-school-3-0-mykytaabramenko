import { useQuery } from "@tanstack/react-query";
import { loadGenres } from "../api/loadGenres.js";

export function useGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: () => loadGenres(),
  });
}

export default useGenres;
