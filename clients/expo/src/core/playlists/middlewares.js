import { getType } from "typesafe-actions";

import AudioInterface from "../audioInterface/index.expo";

import { fetchPlaylists, fetchTracks } from "./playlists.service";
import { ERRORS } from "../errors";

import * as actions from "./actions";
import { revokeToken } from "../user/actions";
import { adaptQuiz } from "../quiz/actions";
import { adaptPlaylistToQuiz } from "../quiz/playlistAdapter";

import { getUserId, getAccessToken, getIsSessionExpired, getRefreshToken } from "../user/selectors";
import { getSelectedPlaylist } from "./selectors";

const playlistsMiddlewares = ({ dispatch, getState }) => (next) => async (action) => {
  next(action);

  if (action.type == getType(actions.fetchPlaylists.request)) {
    try {
      const isSessionExpired = getIsSessionExpired(getState());
      if (isSessionExpired) {
        const refreshToken = getRefreshToken(getState());
        const refreshData = await refresh(refreshToken);

        dispatch(actions.refreshSession.success(refreshData));
      }
      const accessToken = getAccessToken(getState());
      const userId = getUserId(getState());
      const playlists = await fetchPlaylists(userId, accessToken);

      dispatch(actions.fetchPlaylists.success(playlists));
    } catch (error) {
      if (error.type && error.type === ERRORS.SESSION_EXPIRED) {
        dispatch(revokeToken());
      }
      dispatch(actions.fetchPlaylists.failure(error));
    }
  }

  if (action.type == getType(actions.selectPlaylist)) {
    try {
      const accessToken = getAccessToken(getState());
      const playlist = getSelectedPlaylist(getState());
      const tracks = await fetchTracks(playlist.tracks.href, accessToken);
      const quiz = await adaptPlaylistToQuiz(tracks, AudioInterface);

      dispatch(adaptQuiz(quiz));
    } catch (error) {
      if (error.type && error.type === ERRORS.SESSION_EXPIRED) {
        dispatch(revokeToken());
      }
      console.log(error);
    }
  }
};

export default playlistsMiddlewares;
