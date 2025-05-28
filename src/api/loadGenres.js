import { loadData } from "./loadData.js";

export async function loadGenres() {
  const { data } = await loadData("/api/genres");

  return data;
}

export default loadGenres;
