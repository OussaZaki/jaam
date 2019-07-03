import { QUESTION_LEVEL, QUESTION_TYPES } from "./questionTypes";
import { pickRandomly } from "./helpers";

export function* quizGenerator({
  tracks,
  trackOptions,
  albumOptions,
  artistOptions
}) {
  let level = 0;
  const questionOrder = randomOrderList(tracks.length);

  for (const index of questionOrder) {
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

    console.log(question)
    console.log(`The right answer is: ${answer}`)
    options.forEach((opt, i) => console.log(`${i + 1}- ${opt}`));
    var levelUp = yield true
    if (levelUp) {
      level++;
    }
    console.log("\n")
  }
};
