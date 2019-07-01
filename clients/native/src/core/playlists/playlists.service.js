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
}
