export const adaptPlaylistToQuiz = (items) => {
  const tracks = [];
  const trackOptions = [];
  const artistOptions = [];
  const albumOptions = [];

  for (const item of items) {
    const track = {
      name: item.track.name,
      duration: item.track.duration_ms,
      album: item.track.album.name,
      releaseDate: item.track.album.release_date,
      artist: item.track.artists[0].name
    }

    tracks.push(track);
    trackOptions.push(item.track.name);
    albumOptions.push(item.track.album.name);
    for (const artist of item.track.artists) {
      artistOptions.push(artist.name)
    };
  }

  return {
    tracks,
    trackOptions,
    albumOptions,
    artistOptions
  };
}
