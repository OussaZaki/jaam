export const AUTHORIZE_URL = "https://accounts.spotify.com/authorize?";

export const AUTHENTICATE_URL = __DEV__
  ? "http://localhost:8080/auth"
  : "https://jaam-platform.appspot.com/auth";

export const REFRESH_URL = __DEV__
  ? "http://localhost:8080/refresh_token"
  : "https://jaam-platform.appspot.com/refresh_token";

export const CLIENT_ID = "c8dfb982517447f7b67e99ab117008db";

export const SCOPES = [
  "playlist-read",
  "playlist-read-private"
].join(" ");
