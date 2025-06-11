import { get } from "../client";
import type { Genre } from "../types/genre";

const RESOURCE = "/api/genres";

export async function listGenres() {
  return await get<Genre[]>(RESOURCE);
}
