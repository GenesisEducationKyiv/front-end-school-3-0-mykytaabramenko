import { apiClient } from "./client.js";

export async function updateData(path, data = {}) {
  try {
    return await apiClient.put(path, data);
  } catch (e) {
    throw new Error(
      e.response?.data?.error ||
        `Error updating data on path ${path}: ${e.message}`,
    );
  }
}

export default updateData;
