import { post, put, remove, get } from "../client";
import type {
  CreateTrackPayload,
  ListTrackParams,
  Track,
  TrackListResponse,
  UpdateTrackPayload,
  UploadTrackPayload,
} from "../types/track";

const RESOURCE = "/api/tracks";

export async function createTrack(data: CreateTrackPayload, opts = {}) {
  return await post<Track, CreateTrackPayload>(RESOURCE, data, opts);
}

export async function updateTrack(id: Track["id"], data: UpdateTrackPayload) {
  return await put<Track, UpdateTrackPayload>(`${RESOURCE}/${id}`, data);
}

export async function uploadTrack(id: Track["id"], data: UploadTrackPayload) {
  return await post<Track, UploadTrackPayload>(
    `${RESOURCE}/${id}/upload`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
}

export async function deleteTrack(id: Track["id"]) {
  return await remove<void>(`${RESOURCE}/${id}`);
}

export async function loadTrackBySlug(slug: Track["slug"]) {
  return await get<Track>(`${RESOURCE}/${slug}`);
}

export async function listTracks(params: ListTrackParams) {
  return await get<TrackListResponse, ListTrackParams>(RESOURCE, {
    params,
  });
}
