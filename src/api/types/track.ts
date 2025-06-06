import type { Genre } from "./genre.ts";
import { OrderOptions, type TrackListSortOptions } from "../../constants.ts";

export type SortOption =
  (typeof TrackListSortOptions)[keyof typeof TrackListSortOptions];
export type Order = (typeof OrderOptions)[keyof typeof OrderOptions];

export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  genres: Genre[];
  slug: string;
  coverImage?: string;
  audioFile: string;
  createdAt: string;
  updatedAt: string;
}

type TrackWritableFields = Pick<
  Track,
  "title" | "artist" | "album" | "genres" | "coverImage"
>;

export type UpdateTrackPayload = Partial<TrackWritableFields>;

export type CreateTrackPayload = TrackWritableFields;

export interface UploadTrackPayload {
  data: File;
}

export interface ListTrackParams {
  page?: number;
  limit?: number;
  sort?: SortOption;
  order?: Order;
  search?: string;
  genre?: Genre;
  artist?: Track["artist"];
}

export interface TrackListResponse {
  data: Track[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
