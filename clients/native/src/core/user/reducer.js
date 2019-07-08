import { combineReducers } from "redux";
import { getType } from "typesafe-actions";

import * as actions from "./actions";

const initialeState = {
  profile: null,
  access: null,
  isLoading: false,
  error: false
};

export default combineReducers({
  profile: (state = initialeState.profile, action) => {
    switch (action.type) {
      case getType(actions.fetchUser.success):
        return action.payload;

      default:
        return state;
    }
  },
  access: (state = initialeState.access, action) => {
    switch (action.type) {
      case getType(actions.login.success):
        return action.payload;

      case getType(actions.refreshToken.success):
        return {
          ...action.payload,
          state
        }

      case getType(actions.revokeToken):
        return null;

      default:
        return state;
    }
  },
  isLoading: (state = initialeState.isLoading, action) => {
    switch (action.type) {
      case getType(actions.login.request):
      case getType(actions.fetchUser.request):
        return true;

      case getType(actions.fetchUser.success):
      case getType(actions.login.failure):
      case getType(actions.fetchUser.success):
        return false;

      default:
        return state;
    }
  },
  error: (state = initialeState.error, action) => {
    switch (action.type) {
      case getType(actions.login.failure):
      case getType(actions.fetchUser.failure):
        return action.payload;

      default:
        return state;
    }
  }
});
