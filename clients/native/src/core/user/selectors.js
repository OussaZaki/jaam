import { createSelector } from "reselect";

const userState = (state) => state.user;

export const getAccessToken = createSelector(
  userState,
  (state) => state.access ? state.access.accessToken : null
);

export const getTokenExpirationTime = createSelector(
  userState,
  (state) => state.access ? state.access.tokenExpirationTime : null
);

export const getRefreshToken = createSelector(
  userState,
  (state) => state.access ? state.access.refreshToken : null
);


export const getUserId = createSelector(
  userState,
  (state) => state.profile.id
);

export const getIsLoading = createSelector(
  userState,
  (state) => state.isLoading
);
