import { getType } from "typesafe-actions";

import { login, auth, refresh } from "./login.expo.service";
import { getUser } from "./user.service";
import { ERRORS } from "../errors";
import * as actions from "./actions";
import * as selectors from "./selectors";

const userMiddlewares = ({ dispatch, getState }) => (next) => async (action) => {
  next(action);

  if (action.type == getType(actions.login.request)) {
    try {
      const access = await login();
      const authData = await auth(access);
      const user = await getUser(authData.accessToken);

      dispatch(actions.fetchUser.success(user));
      dispatch(actions.login.success(authData));
    } catch (error) {
      dispatch(actions.login.failure(error));
    }
  }

  if (action.type == getType(actions.refreshSession.request)) {
    try {
      const refreshToken = selectors.getRefreshToken(getState());
      const refreshData = await refresh(refreshToken);

      dispatch(actions.refreshSession.success(refreshData));
    } catch (error) {
      dispatch(actions.refreshSession.failure(error));
    }
  }

  if (action.type == getType(actions.fetchUser.request)) {
    try {
      const accessToken = selectors.getAccessToken(getState());
      const user = await getUser(accessToken);
      dispatch(actions.fetchUser.success(user));
    } catch (error) {
      if (error.type && error.type === ERRORS.SESSION_EXPIRED) {
        dispatch(actions.revokeToken());
      }

      dispatch(actions.fetchUser.failure(error));
    }
  }
};

export default userMiddlewares;
