import { createAsyncAction, createStandardAction } from "typesafe-actions";

export const login = createAsyncAction(
  "LOGIN_REQUEST",
  "LOGIN_SUCCESS",
  "LOGIN_FAILURE"
)();

export const fetchUser = createAsyncAction(
  "FETCH_USER_REQUEST",
  "FETCH_USER_SUCCESS",
  "FETCH_USER_FAILURE"
)();

export const revokeToken = createStandardAction("REVOKE_TOKEN")();
