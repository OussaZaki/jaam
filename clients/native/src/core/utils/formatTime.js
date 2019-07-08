export const formatTime = (time) => {
  let seconds = ("0" + (Math.floor((time / 1000) % 60) % 60)).slice(-2);
  let minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
  let hours = ("0" + Math.floor((time / 3600000) % 60)).slice(-2);

  return {
    seconds,
    minutes,
    hours
  }
}
