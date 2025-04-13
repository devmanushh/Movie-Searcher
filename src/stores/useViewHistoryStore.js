import { uniqBy, pipe, prepend } from "ramda";
import { create } from "zustand";

const useViewHistoryStore = create(set => ({
  movies: [],
  selectedMovie: null,
  setMovies: movie =>
    set(state => ({
      movies: pipe(
        prepend(movie),
        uniqBy(m => m.imdbID)
      )(state.movies),
    })),
  setSelectedMovie: movie => set({ selectedMovie: movie }),

  removeMovie: imdbID =>
    set(state => ({
      movies: state.movies.filter(movie => movie.imdbID !== imdbID),
    })),

  clearHistory: () => set({ movies: [] }),
}));

export default useViewHistoryStore;
