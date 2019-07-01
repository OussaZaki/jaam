export const getPlaylists = async (userId, accessToken) => {
  try {
    let response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });
    let responseJson = await response.json();

    return responseJson.items;
  } catch (error) {
    console.error(error);
  }
}
