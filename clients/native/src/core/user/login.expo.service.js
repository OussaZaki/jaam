import { AuthSession } from "expo";
import {
  AUTHORIZE_URL,
  CLIENT_ID,
  SCOPES
} from "./const";

const _getExpirationTime = (timeInSeconds) => {
  return new Date().getTime() + (parseInt(timeInSeconds, 10) * 1000);
}

// TODO handle the cancel case.
export const login = async () => {
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
