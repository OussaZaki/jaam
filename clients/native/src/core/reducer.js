import { combineReducers } from "redux";

import userReducer from "./user/reducer";
import playlistsReducer from "./playlists/reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  playlists: playlistsReducer
});

export default rootReducer;
