export const randomizeTracks = async (playlist, numberOfTracks) => {
}

export const adaptPlaylistToQuiz = async (items, audioInterface) => {
  const tracks = [];
  const trackOptions = [];
  const artistOptions = [];
  const albumOptions = [];

  for (const item of items) {
    const audio = await audioInterface.getTrackAudio(item.track.preview_url);
    const track = {
      name: item.track.name,
      duration: item.track.duration_ms,
      album: item.track.album.name,
      releaseDate: item.track.album.release_date,
      artist: item.track.artists[0].name,
      audio
    };

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
