import { AppError, ERRORS } from "../errors";

export const getUser = async (accessToken) => {
  let response = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  });
  let responseJson = await response.json();
  if (responseJson && responseJson.error && responseJson.error.status === 401) {
    throw new AppError(ERRORS.SESSION_EXPIRED);
  }

  return responseJson;
}
