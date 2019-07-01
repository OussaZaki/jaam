import { AuthSession } from "expo";
import {
  AUTHORIZE_URL,
  CLIENT_ID,
  SCOPES
} from "./const";

// TODO handle the cancel case.
export const login = async () => {
  try {
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

    return result.params.access_token;
  } catch (err) {
    console.error(err);
  }
};
