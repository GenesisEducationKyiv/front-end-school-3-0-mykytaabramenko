import { apiClient } from "./client.js";

export async function loadData(path, params = {}) {
  try {
    return await apiClient.get(path, { params });
  } catch (e) {
    throw new Error(
      e.response?.data?.error ||
        `Error loading data from ${path}: ${e.message}`,
    );
  }
}

export default loadData;
