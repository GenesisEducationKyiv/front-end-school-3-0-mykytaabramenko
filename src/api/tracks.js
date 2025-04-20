import { loadData } from "./loadData.js";
import { updateData } from "./updateData.js";
import { createData } from "./createData.js";
import { deleteData } from "./deleteData.js";

export async function loadTracks(params) {
  const { data } = await loadData("/api/tracks", params);
  return data;
}

export async function loadTrack(slug) {
  const { data } = await loadData(`/api/tracks/${slug}`);
  return data;
}

export async function updateTrack(id, params) {
  const { data } = await updateData(`/api/tracks/${id}`, params);
  return data;
}

export async function createTrack(params) {
  const { data } = await createData(`/api/tracks`, params);
  return data;
}

export async function deleteTrack(id) {
  const { data } = await deleteData(`/api/tracks/${id}`);
  return data;
}

export async function uploadTrack(id, params) {
  const { data } = await createData(`/api/tracks/${id}/upload`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}
