import { useShowMovies } from "hooks/reactQuery/useMoviesApi";
import { Rating, RatingFilled } from "neetoicons";
import { Modal, Spinner, Tag, Typography, Button } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import useFavouriteMoviesStore from "stores/useFavouriteMoviesStore";
import { setDefaultImage } from "utils/setDefaultImage";

import { getMovieDetails } from "./constants";

const Details = ({ id, isOpen, onClose }) => {
  const { addFavouriteMovie, removeFavouriteMovie, favouriteMovies } =
    useFavouriteMoviesStore();

  const isFavorited = favouriteMovies.some(movie => movie.imdbID === id);

  const toggleFavorite = () => {
    if (isFavorited) {
      removeFavouriteMovie(id);
    } else {
      addFavouriteMovie(movie);
    }
  };

  const { Header, Body } = Modal;
  const { t } = useTranslation();

  const { isLoading, data: movie = {} } = useShowMovies(id);

  const { Title: title, Genre: genre, Poster: poster, Plot: plot } = movie;

  const genres = genre ? genre.split(", ") : [];

  const imageUrl = setDefaultImage(poster);

  const movieDetails = getMovieDetails(t, movie);

  return (
    <Modal isOpen={isOpen} size="large" onClose={onClose}>
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <Header>
            <div className="flex w-full items-center gap-1">
              <Typography>{title}</Typography>
              <Button
                icon={isFavorited ? RatingFilled : Rating}
                style="tertiary"
                tooltipProps={{
                  content: isFavorited
                    ? t("movie.removeFromFavourites")
                    : t("movie.addToFavourites"),
                  position: "right",
                }}
                onClick={toggleFavorite}
              />
            </div>
            {!isEmpty(genres) &&
              genres.map(genre => (
                <Tag className="my-3 mr-2" key={genre} type="solid">
                  {genre}
                </Tag>
              ))}
          </Header>
          <Body>
            <div className="flex h-full">
              <div className="w-1/3 p-1">
                <img
                  alt={`${title} Poster`}
                  className="neeto-ui-rounded-lg object-contain"
                  src={imageUrl}
                  onError={event => (event.target.src = setDefaultImage("N/A"))}
                />
              </div>
              <div className="ml-10 w-2/3 space-y-4 p-4">
                <Typography component="i" style="body2" weight="light">
                  {plot}
                </Typography>
                <div className="space-y-2">
                  {movieDetails.map(({ label, value }) => (
                    <div className="flex items-center gap-2" key={label}>
                      <Typography style="body2" weight="bold">
                        {label}:
                      </Typography>
                      <Typography style="body2">{value}</Typography>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Body>
        </>
      )}
    </Modal>
  );
};
export default Details;
