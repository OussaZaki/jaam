import { QUESTION_LEVEL, QUESTION_TYPES } from "./questionTypes";
import { pickRandomly, randomOrderList } from "./helpers";

export function* quizGenerator({
  tracks,
  trackOptions,
  albumOptions,
  artistOptions
}) {
  let level = 0;
  const questionOrder = randomOrderList(tracks.length);

  for (const index of questionOrder) {
    const audio = tracks[index].audio;
    const question = pickRandomly(QUESTION_LEVEL[level], 1);

    let options, answer;
    switch (question) {
      case QUESTION_TYPES.TRACK_NAME:
        answer = tracks[index].name;
        options = pickRandomly(trackOptions, 3, tracks[index].name);

        break;

      case QUESTION_TYPES.ARTIST_NAME:
        answer = tracks[index].artist;
        options = pickRandomly(artistOptions, 3, tracks[index].artist);
        break;

      case QUESTION_TYPES.RELEASE_DATE:
        answer = tracks[index].releaseDate;
        options = []
        break;

      case QUESTION_TYPES.ALBUM_NAME:
        answer = tracks[index].album;
        options = pickRandomly(albumOptions, 3, tracks[index].album);
        break;

      case QUESTION_TYPES.TRACK_DURATION:
        answer = tracks[index].duration;
        options = []
        break;
      default:
        break;
    }

    var levelUp = yield {
      audio,
      question,
      answer,
      options,
      level
    };

    if (levelUp) level++;
  }

  return;
};
