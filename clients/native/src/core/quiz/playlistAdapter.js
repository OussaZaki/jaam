// TODO: sound interface should be injectable.
import { Audio } from 'expo';

const _getTrackAudio = async (uri) => {
  const source = { uri };
  const initialStatus = {
    shouldPlay: false,
    isLooping: true
  };

  const sound = await Audio.Sound.createAsync(source, initialStatus, onPlaybackStatusUpdate = null, downloadFirst = true);
  return sound;
}

export const adaptPlaylistToQuiz = async (items) => {
  const tracks = [];
  const trackOptions = [];
  const artistOptions = [];
  const albumOptions = [];

  Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    playThroughEarpieceAndroid: false,
  });

  for (const item of items) {
    const audio = await _getTrackAudio(item.track.preview_url);
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
