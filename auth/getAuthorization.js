import { AuthSession } from "expo";
import { getCredentials } from "./getCredentials";

const scopes = [
  "user-modify-playback-state",
  "user-read-playback-state",
  "user-library-read",
  "playlist-read-private",
  "playlist-read-collaborative"
].join(" ");

export const getAuthorization = async () => {
  try {
    const credentials = await getCredentials(); //we wrote this function above
    const redirectUrl = AuthSession.getRedirectUrl();
    const result = await AuthSession.startAsync({
      authUrl:
        "https://accounts.spotify.com/authorize" +
        "?response_type=code" +
        "&client_id=" +
        credentials.clientId +
        (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
        "&redirect_uri=" +
        encodeURIComponent(redirectUrl)
    });

    return result.params.code;
  } catch (err) {
    console.error(err);
  }
};
