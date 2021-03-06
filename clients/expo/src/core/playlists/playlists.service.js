import { AppError, ERRORS } from "../errors";

export const fetchPlaylists = async (userId, accessToken) => {
  let response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  });
  let responseJson = await response.json();
  if (responseJson && responseJson.error && responseJson.error.status === 401) {
    throw new AppError(ERRORS.SESSION_EXPIRED);
  }

  return responseJson.items;
};

export const fetchTracks = async (tracksUrl, accessToken) => {
  let response = await fetch(tracksUrl, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  });

  let responseJson = await response.json();
  if (responseJson && responseJson.error && responseJson.error.status === 401) {
    throw new AppError(ERRORS.SESSION_EXPIRED);
  }

  return responseJson.items.slice(0, 10);
}
