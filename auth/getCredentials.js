import { spotifyCredentials } from "./secrets";

export const getCredentials = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(spotifyCredentials);
    }, 100);
  });
};
