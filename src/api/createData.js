import { apiClient } from "./client.js";

export async function createData(path, data = {}, opts = {}) {
  try {
    return await apiClient.post(path, data, opts);
  } catch (e) {
    throw new Error(
      e.response?.data?.error || `Error creating data on ${path}: ${e.message}`,
    );
  }
}

export default createData;
