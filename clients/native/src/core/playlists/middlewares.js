import { getType } from "typesafe-actions";
import { AsyncStorage } from "react-native";

import { fetchPlaylists } from "./playlists.service";
import { ERRORS } from "../errors";
import { revokeToken } from "../user/actions";
import { getUserId, getAccessToken } from "../user/selectors";

import * as actions from "./actions";

const playlistsMiddlewares = ({ dispatch, getState }) => (next) => async (action) => {
  next(action);

  if (action.type == getType(actions.fetchPlaylists.request)) {
    try {
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
};

export default playlistsMiddlewares;
