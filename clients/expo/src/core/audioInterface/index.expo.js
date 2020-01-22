import { Audio } from 'expo';


/**
 * Init the expo audio interface and set the Audio Mode Asynchronisly.
 *
 * TODO: Inject the configuration instead of hard coding it.
 * TODO: Inspect the async part of the init function.
 * TODO: Add init failure flow with a custome exception.
 */
const initAudioInterface = () => {
  Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    playThroughEarpieceAndroid: false,
  });
}



/**
 * Asynchronisly Download the audio track for a given URI
 *
 * @param {string} uri uri string of the audio to be downloaded.
 *
 * TODO: Add download failure flow with a custome exception.
 */
const getTrackAudio = async (uri) => {
  const source = { uri };
  const initialStatus = {
    shouldPlay: false,
    isLooping: true
  };

  const sound = await Audio.Sound.createAsync(source, initialStatus, onPlaybackStatusUpdate = null, downloadFirst = true);
  return sound;
}

export default {
  getTrackAudio,
  initAudioInterface
}
