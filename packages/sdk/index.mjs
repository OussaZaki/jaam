import { payload } from "./tracks";

const adaptPlaylistTracks = (payload) => {
  const tracks = [];
  const trackOptions = [];
  const artistOptions = [];
  const albumOptions = [];

  for (const item of payload.items) {
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

const QUESTION_TYPES = {
  TRACK_NAME: 'Guess the song name.',
  ARTIST_NAME: 'Guess the artist name.',
  RELEASE_DATE: 'Guess the release date.',
  ALBUM_NAME: 'Guess the album name',
  TRACK_DURATION: 'Guess the song duration'
};


const QUESTION_LEVEL = {
  0: [
    QUESTION_TYPES.TRACK_NAME,
    QUESTION_TYPES.ARTIST_NAME,
  ],
  1: [
    QUESTION_TYPES.RELEASE_DATE
  ],
  2: [
    QUESTION_TYPES.ALBUM_NAME,
    QUESTION_TYPES.TRACK_DURATION
  ]
};

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

    // console.log(question)
    // console.log(`The right answer is: ${answer}`)
    // options.forEach((opt, i) => console.log(`${i + 1}- ${opt}`));
    // console.log("\n")

    var levelUp = yield {
      question,
      answer,
      options,
      level
    };

    if (levelUp) level++;
  }
}

const pickRandomly = (array, n, include) => {
  let result = new Array(n + 1),
    len = array.length,
    taken = new Array(len);

  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");

  if (include)
    result[n] = include;
  while (n) {
    const x = Math.floor(Math.random() * len);
    if (include && array[x] === include) {
      continue;
    }
    n--;
    result[n] = array[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }

  if (result.length === 2)
    return result[0];

  return shuffle(result);
};

const randomOrderList = (length) => {
  const array = Array.from(Array(length), (_x, index) => index);
  let tmp, current, top = array.length;
  while (--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }

  return array;
};

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const main = () => {
  const state = adaptPlaylistTracks(payload);
  const questionOrder = randomOrderList(state.tracks.length);
  const qz = quizGenerator({ ...state, questionOrder });

  qz.next();
  qz.next();
  qz.next();
  qz.next(true);
  qz.next();
  qz.next();
  qz.next(true);
  qz.next();
  return;
}

console.log("START!");
main();
