import { apiClient } from "./client.js";

export async function deleteData(path) {
  try {
    return await apiClient.delete(path);
  } catch (e) {
    throw new Error(
      e.response?.data?.error ||
        `Error deleting data on path ${path}: ${e.message}`,
    );
  }
}

export default deleteData;
