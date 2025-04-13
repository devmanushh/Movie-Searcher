import { removeBy } from "neetocist";
import { uniqBy, pipe, append } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFavouriteMoviesStore = create(
  persist(
    set => ({
      favouriteMovies: [],
      addFavouriteMovie: movie =>
        set(state => ({
          favouriteMovies: pipe(
            append(movie),
            uniqBy(movie => movie.imdbID)
          )(state.favouriteMovies),
        })),
      removeFavouriteMovie: movieId =>
        set(state => ({
          favouriteMovies: removeBy({ imdbID: movieId }, state.favouriteMovies),
        })),
    }),
    {
      name: "favourite-movies",
    }
  )
);

export default useFavouriteMoviesStore;
