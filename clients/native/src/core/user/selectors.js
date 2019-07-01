import { createSelector } from "reselect";

const userState = (state) => state.user;

export const getAccessToken = createSelector(
  userState,
  (state) => state.access ? state.access.token : null
);

export const getTokenExpirationTime = createSelector(
  userState,
  (state) => state.access ? state.access.expirationTime : null
);

export const getUserId = createSelector(
  userState,
  (state) => state.profile.id
);

export const getIsLoading = createSelector(
  userState,
  (state) => state.isLoading
);
