import { DEFAULT_POSTER_IMAGE } from "./constants";

export const setDefaultImage = posterURL =>
  posterURL === "N/A" ? DEFAULT_POSTER_IMAGE : posterURL;
