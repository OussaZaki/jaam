import { Audio } from 'expo';

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
