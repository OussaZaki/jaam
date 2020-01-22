import { combineReducers } from "redux";

import userReducer from "./user/reducer";
import playlistsReducer from "./playlists/reducer";
import quizReducer from "./quiz/reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  playlists: playlistsReducer,
  quiz: quizReducer
});

export default rootReducer;
