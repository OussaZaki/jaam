import { createSelector } from "reselect";

const globalState = (state) => state.playlists;

export const getPlaylists = createSelector(
  globalState,
  (state) => state.playlists
);

export const getSelectedPlaylistId = createSelector(
  globalState,
  (state) => state.selectedPlaylist
);

export const getSelectedPlaylist = createSelector(
  getPlaylists,
  getSelectedPlaylistId,
  (playlists, targetId) => playlists.find(playlist => playlist.id === targetId)
);

export const getIsLoading = createSelector(
  globalState,
  (state) => state.isLoading
);

export const getIsError = createSelector(
  globalState,
  (state) => state.error
);
