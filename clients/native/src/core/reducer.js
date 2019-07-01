import { combineReducers } from "redux";

import playlistsReducer from "./playlists/reducer";

export const rootReducer = combineReducers({
  playlists: playlistsReducer
});

export default rootReducer;
