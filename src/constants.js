const PlaybackStates = {
  PLAYING: "playing",
  PAUSED: "paused",
  ENDED: "ended",
};

const TrackListSearchParams = {
  PAGE: "page",
  LIMIT: "limit",
  ARTIST: "artist",
  GENRE: "genre",
  SEARCH: "search",
  SORT: "sort",
  ORDER: "order",
};

const DefaultTrackListSearchParams = {
  PAGE: 1,
  LIMIT: 10,
  ORDER: "asc",
};

export { PlaybackStates, TrackListSearchParams, DefaultTrackListSearchParams };
