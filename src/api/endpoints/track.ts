import { apiClient } from "../client.ts";
import { handleApiError } from "../../utils.ts";
import type { AxiosResponse } from "axios";
import type {
  CreateTrackPayload,
  ListTrackParams,
  Track,
  TrackListResponse,
  UpdateTrackPayload,
  UploadTrackPayload,
} from "../types/track.ts";

const RESOURCE = "/api/tracks";

export async function createTrack(data: CreateTrackPayload, opts = {}) {
  try {
    const response = await apiClient.post<
      Track,
      AxiosResponse<Track>,
      CreateTrackPayload
    >(RESOURCE, data, opts);
    return response.data;
  } catch (e) {
    handleApiError(e);
  }
}

export async function updateTrack(id: Track["id"], data: UpdateTrackPayload) {
  try {
    const response = await apiClient.put<
      Track,
      AxiosResponse<Track>,
      UpdateTrackPayload
    >(`${RESOURCE}/${id}`, data);
    return response.data;
  } catch (e) {
    handleApiError(e);
  }
}

export async function uploadTrack(id: Track["id"], data: UploadTrackPayload) {
  try {
    const response = await apiClient.put<
      Track,
      AxiosResponse<Track>,
      UploadTrackPayload
    >(`${RESOURCE}/${id}/upload`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (e) {
    handleApiError(e);
  }
}

export async function deleteTrack(id: Track["id"]) {
  try {
    const response = await apiClient.delete<void>(`${RESOURCE}/${id}`);
    return response.data;
  } catch (e) {
    handleApiError(e);
  }
}

export async function loadTrackBySlug(slug: Track["slug"]) {
  try {
    const response = await apiClient.get<Track>(RESOURCE, { params: { slug } });
    return response.data;
  } catch (e) {
    handleApiError(e);
  }
}

export async function listTracks(params: ListTrackParams) {
  try {
    const response = await apiClient.get<TrackListResponse>(RESOURCE, {
      params,
    });
    return response.data;
  } catch (e) {
    handleApiError(e);
  }
}
