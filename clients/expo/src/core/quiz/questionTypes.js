export const QUESTION_TYPES = {
  TRACK_NAME: 'Guess the song name.',
  ARTIST_NAME: 'Guess the artist name.',
  RELEASE_DATE: 'Guess the release date.',
  ALBUM_NAME: 'Guess the album name',
  TRACK_DURATION: 'Guess the song duration'
};


export const QUESTION_LEVEL = {
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
