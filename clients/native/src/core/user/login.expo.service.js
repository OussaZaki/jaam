import { AuthSession } from "expo";
import querystring from "querystring";
import { AsyncStorage } from 'react-native';

import { generateRandomString } from "../utils/generateRandomString";
import { AppError, ERRORS } from "../errors";
import {
  AUTHORIZE_URL,
  AUTHENTICATE_URL,
  CLIENT_ID,
  SCOPES
} from "./const";

const _getExpirationTime = (timeInSeconds) => {
  return new Date().getTime() + (parseInt(timeInSeconds, 10) * 1000);
}

// TODO handle the cancel case.
export const _login = async () => {
  const redirectUrl = AuthSession.getRedirectUrl();
  const result = await AuthSession.startAsync({
    authUrl:
      AUTHORIZE_URL +
      "?response_type=token" +
      "&client_id=" +
      CLIENT_ID +
      (SCOPES ? "&scope=" + encodeURIComponent(SCOPES) : "") +
      "&redirect_uri=" +
      encodeURIComponent(redirectUrl)
  });

  return {
    token: result.params.access_token,
    expirationTime: _getExpirationTime(result.params.expires_in)
  };
};

export const login = async () => {
  const state = generateRandomString(16);
  await AsyncStorage.setItem('spotify_auth_state', state);

  const redirectUrl = AuthSession.getRedirectUrl();
  const result = await AuthSession.startAsync({
    authUrl: AUTHORIZE_URL + querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: SCOPES,
      redirect_uri: redirectUrl,
      state: state
    })
  });

  return {
    code: result.params.code || null,
    state: result.params.state || null
  };
};

export const auth = async ({ code, state }) => {
  const storedState = await AsyncStorage.getItem('spotify_auth_state');
  if (state === null || state !== storedState) {
    throw new AppError(ERRORS.STATE_MISSMATCH);
  }

  debugger;
  const authenticate = await fetch(AUTHENTICATE_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    referrer: 'jaam-native-client',
    body: JSON.stringify({
      code,
      redirectUrl: AuthSession.getRedirectUrl()
    })
  });

  const authJson = await authenticate.json();
  return authJson;
};

export const refresh = async refreshToken => {
  const refreshing = await fetch(REFRESH_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    referrer: 'jaam-native-client',
    body: JSON.stringify({ refresh_token: refreshToken })
  });

  const refreshResult = await refreshing.json();
  return refreshResult;
};
