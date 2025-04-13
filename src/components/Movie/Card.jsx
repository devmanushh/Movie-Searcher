import React, { useState } from "react";

import { Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import useViewHistoryStore from "stores/useViewHistoryStore";
import { setDefaultImage } from "utils/setDefaultImage";

import MovieDetails from "./Details";

const Card = ({ movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setMovies, setSelectedMovie } = useViewHistoryStore();
  const { t } = useTranslation();

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Type: type,
    imdbID: movieID,
  } = movie;

  const imageUrl = setDefaultImage(poster);

  return (
    <div className="flex h-auto w-52 flex-col rounded-lg border p-4 shadow-lg">
      <img
        alt={`${title} Poster`}
        className="mx-auto h-2/3 w-2/3"
        src={imageUrl}
        onError={event => (event.target.src = setDefaultImage("N/A"))}
      />
      <div className="flex flex-col gap-2">
        <Typography className="font-bold text-gray-800" variant="body1">
          {title}
        </Typography>
        <Typography
          className="font-bold text-gray-400"
          variant="body2"
          weight="bold"
        >
          {type === "movie" ? t("movie.type.movie") : t("movie.type.series")} •{" "}
          {year}
        </Typography>
        <Button
          className="flex w-2/3 justify-center bg-gray-100 font-bold text-blue-600"
          label={t("movie.viewMore")}
          style="text"
          onClick={() => {
            setIsModalOpen(true);
            setMovies(movie);
            setSelectedMovie(movie);
          }}
        />
      </div>
      {isModalOpen && (
        <MovieDetails
          id={movieID}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
export default Card;
