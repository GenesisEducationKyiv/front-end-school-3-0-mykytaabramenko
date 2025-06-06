import { useQuery } from "@tanstack/react-query";
import { listGenres } from "../api/endpoints";

export function useGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: () => listGenres(),
  });
}

export default useGenres;
