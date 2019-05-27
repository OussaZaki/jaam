import { getCredentials } from "./getCredentials";
import { getTokens } from "./getTokens";

export const refreshTokens = async () => {
  try {
    const credentials = await getCredentials(); //we wrote this function above
    const credsB64 = btoa(
      `${credentials.clientId}:${credentials.clientSecret}`
    );
    const refreshToken = await getUserData("refreshToken");

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credsB64}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`
    });
    const responseJson = await response.json();

    if (responseJson.error) {
      await getTokens();
    } else {
      const {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        expires_in: expiresIn
      } = responseJson;

      const expirationTime = new Date().getTime() + expiresIn * 1000;
      await setUserData("accessToken", newAccessToken);
      if (newRefreshToken) {
        await setUserData("refreshToken", newRefreshToken);
      }
      await setUserData("expirationTime", expirationTime);
    }
  } catch (err) {
    console.error(err);
  }
};
