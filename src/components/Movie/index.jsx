import React, { useState, useRef, useEffect } from "react";

import EmptyPage from "components/commons/EmptyPage";
import PageLoader from "components/commons/PageLoader";
import { useFetchMovies } from "hooks/reactQuery/useMoviesApi";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Search } from "neetoicons";
import { Input, Pagination } from "neetoui";
import { mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "./constants";
import Filter from "./Filter";
import MovieList from "./List";

const MoviePage = () => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const history = useHistory();
  const queryParams = useQueryParams();
  const { page, searchTerm = "", type, year } = queryParams;
  const [searchText, setSearchText] = useState(searchTerm);

  const handleUpdateQueryParams = useFuncDebounce(value => {
    const params = filterNonNull({
      searchTerm: value || null,
      page: value ? DEFAULT_PAGE_NUMBER : null,
    });

    history.replace(buildUrl(routes.root, params));
  });

  const moviesParams = {
    searchTerm,
    page: Number(page) || DEFAULT_PAGE_NUMBER,
    year,
    type,
  };

  const { data: { Search: movies = [], totalResults } = {}, isLoading } =
    useFetchMovies(moviesParams);

  const handlePageNavigation = page =>
    history.push(buildUrl(routes.root, mergeLeft({ page }, queryParams)));

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <PageLoader />;
    }

    if (!searchTerm.trim()) {
      return <EmptyPage text={t("empty.movie")} />;
    }

    return (
      <div className="relative" style={{ height: "68vh" }}>
        <MovieList movies={movies} />
        <div className="absolute right-4 mt-6">
          <Pagination
            count={totalResults}
            navigate={handlePageNavigation}
            pageNo={Number(page) || DEFAULT_PAGE_NUMBER}
            pageSize={DEFAULT_PAGE_SIZE}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen w-full p-6">
      <div className="mx-auto mb-8 flex max-w-2xl items-center gap-3">
        <Input
          className="rounded-lg border"
          placeholder={t("search.placeholder")}
          prefix={<Search />}
          ref={inputRef}
          type="search"
          value={searchText}
          onChange={e => {
            const {
              target: { value },
            } = e;
            setSearchText(value);
            handleUpdateQueryParams(value);
          }}
        />
        <Filter searchTerm={searchTerm} />
      </div>
      {renderContent()}
    </div>
  );
};

export default MoviePage;
