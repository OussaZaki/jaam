import { combineReducers } from "redux";
import { getType } from "typesafe-actions";

import * as actions from "./actions";

const initialeState = {
  playlists: [],
  selectedPlaylist: null,
  isLoading: false,
  error: null
};

export default combineReducers({
  playlists: (state = initialeState.playlists, action) => {
    switch (action.type) {
      case getType(actions.fetchPlaylists.success):
        return action.payload;

      default:
        return state;
    }
  },
  selectedPlaylist: (state = initialeState.selectedPlaylist, action) => {
    switch (action.type) {
      case getType(actions.selectPlaylist):
        return action.payload;

      default:
        return state;
    }
  },
  isLoading: (state = initialeState.isLoading, action) => {
    switch (action.type) {
      case getType(actions.fetchPlaylists.request):
        return true;

      case getType(actions.fetchPlaylists.success):
      case getType(actions.fetchPlaylists.failure):
        return false;

      default:
        return state;
    }
  },
  error: (state = initialeState.error, action) => {
    switch (action.type) {
      case getType(actions.fetchPlaylists.failure):
        return action.payload;

      default:
        return state;
    }
  }
});
