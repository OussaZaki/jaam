import { getType } from "typesafe-actions";
import { AsyncStorage } from "react-native";

import { getPlaylists } from "../../services/getPlaylists";
import { getUser } from "../../services/getUser";
import { ERRORS } from "../errors";
import * as actions from "./actions";

const playlistsMiddlewares = ({ dispatch, getState }) => (next) => async (action) => {
  next(action);

  if (action.type == getType(actions.fetchPlaylists.request)) {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const user = await getUser(accessToken);
      const playlists = await getPlaylists(user.id, accessToken);

      dispatch(actions.fetchPlaylists.success(playlists));
    } catch (error) {
      console.log(error);
      if (error.type && error.type === ERRORS.SESSION_EXPIRED) {
        await AsyncStorage.removeItem("accessToken");
        dispatch(actions.fetchPlaylists.failure(error));
      }
    }
  }
};

export default playlistsMiddlewares;
