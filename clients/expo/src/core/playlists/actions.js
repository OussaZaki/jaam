import { createAsyncAction, createStandardAction } from "typesafe-actions";

export const fetchPlaylists = createAsyncAction(
  "FETCH_PLAYLISTS_REQUEST",
  "FETCH_PLAYLISTS_SUCCESS",
  "FETCH_PLAYLISTS_FAILURE"
)();

export const selectPlaylist = createStandardAction("SELECT_PLAYLIST")();
