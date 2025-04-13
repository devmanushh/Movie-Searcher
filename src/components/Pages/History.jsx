import React, { useRef, useEffect, useState } from "react";

import classNames from "classnames";
import { Delete } from "neetoicons";
import { Alert, Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import useViewHistoryStore from "stores/useViewHistoryStore";

import EmptyPage from "../commons/EmptyPage";

const History = () => {
  const [isClearAlertOpen, setIsClearAlertOpen] = useState(false);
  const [latestMovie, setLatestMovie] = useState(null);
  const { t } = useTranslation();

  const movies = useViewHistoryStore(state => state.movies);
  const removeMovie = useViewHistoryStore(state => state.removeMovie);
  const clearHistory = useViewHistoryStore(state => state.clearHistory);

  const historyContainerRef = useRef(null);
  const movieItemRefs = useRef({});

  useEffect(() => {
    setLatestMovie(movies.length > 0 ? movies[0] : null);
  }, [movies]);

  const handleRemoveMovie = movieId => {
    removeMovie(movieId);

    const updatedMovies = movies.filter(movie => movie.imdbID !== movieId);
    setLatestMovie(
      updatedMovies.length ? updatedMovies[updatedMovies.length - 1] : null
    );
  };

  const handleClearHistory = () => setIsClearAlertOpen(true);

  const confirmClearHistory = () => {
    clearHistory();
    setIsClearAlertOpen(false);
    setLatestMovie(null);
  };

  return (
    <div
      className="w-full overflow-y-scroll rounded-lg bg-white p-4 shadow-lg"
      style={{ height: "89vh" }}
    >
      <div className="sticky top-0 mb-4 flex items-center justify-between">
        <Typography className="text-center text-lg font-bold">
          {t("viewHistory.title")}
        </Typography>
        <Button
          className="font-semibold text-red-600"
          disabled={!movies.length}
          label={t("viewHistory.clearAll")}
          style="tertiary"
          onClick={handleClearHistory}
        />
      </div>
      {movies.length === 0 ? (
        <EmptyPage text={t("viewHistory.empty")} />
      ) : (
        <div
          className="max-h-[70vh] space-y-2 overflow-y-auto"
          ref={historyContainerRef}
        >
          {movies.map((movie, index) => (
            <div
              key={`${movie.imdbID}-${index}`}
              ref={el => (movieItemRefs.current[movie.imdbID] = el)}
              className={classNames(
                "flex items-center justify-between rounded-lg px-4 py-3 transition-colors",
                movie.imdbID === latestMovie?.imdbID
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-black"
              )}
            >
              <span>{movie.Title}</span>
              <Delete
                className="cursor-pointer"
                onClick={() => handleRemoveMovie(movie.imdbID)}
              />
            </div>
          ))}
        </div>
      )}
      <Alert
        cancelButtonLabel={t("common.cancel")}
        closeOnOutsideClick={false}
        isOpen={isClearAlertOpen}
        message={t("viewHistory.confirmClearMessage")}
        submitButtonLabel={t("common.clear")}
        title={t("viewHistory.clearTitle")}
        onClose={() => setIsClearAlertOpen(false)}
        onSubmit={confirmClearHistory}
      />
    </div>
  );
};

export default History;
