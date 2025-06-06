import { apiClient } from "../client.ts";
import { handleApiError } from "../../utils.ts";
import type { Genre } from "../types/genre.ts";

const RESOURCE = "/api/genres";

export async function listGenres() {
  try {
    const response = await apiClient.get<Genre[]>(RESOURCE);
    return response.data;
  } catch (e) {
    handleApiError(e);
  }
}
