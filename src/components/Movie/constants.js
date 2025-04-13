import dayjs from "dayjs";
import * as yup from "yup";

export const DEFAULT_PAGE_SIZE = 8;
export const DEFAULT_PAGE_NUMBER = 1;

export const yearSchema = yup
  .number()
  .min(1900, "Serch after 1900")
  .max(
    dayjs().year() + 2,
    `Serch for less than or equal to ${dayjs().year() + 2}`
  )
  .nullable()
  .transform(value => (isNaN(value) ? null : value));

export const getMovieDetails = (t, movie) => [
  { label: t("movie.director"), value: movie.Director },
  { label: t("movie.actors"), value: movie.Actors },
  { label: t("movie.boxOffice"), value: movie.BoxOffice },
  { label: t("movie.year"), value: movie.Year },
  { label: t("movie.runtime"), value: movie.Runtime },
  { label: t("movie.language"), value: movie.Language },
  { label: t("movie.rated"), value: movie.Rated },
];
