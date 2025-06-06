const PlaybackStates = {
  PLAYING: "playing",
  PAUSED: "paused",
  ENDED: "ended",
} as const;

const TrackListSearchParams = {
  PAGE: "page",
  LIMIT: "limit",
  ARTIST: "artist",
  GENRE: "genre",
  SEARCH: "search",
  SORT: "sort",
  ORDER: "order",
} as const;

const DefaultTrackListSearchParams = {
  PAGE: 1,
  LIMIT: 10,
  ORDER: "asc",
} as const;

const TrackListSortOptions = {
  TITLE: "title",
  ARTIST: "artist",
  ALBUM: "album",
  CREATED_AT: "createdAt",
} as const;

const OrderOptions = {
  ASC: "asc",
  DESC: "desc",
} as const;

export {
  PlaybackStates,
  TrackListSearchParams,
  DefaultTrackListSearchParams,
  TrackListSortOptions,
  OrderOptions,
};
