import EmptyPage from "components/commons/EmptyPage";
import { Typography } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import useFavouriteMoviesStore from "stores/useFavouriteMoviesStore";

const Favourites = () => {
  const { t } = useTranslation();
  const favouriteMovies = useFavouriteMoviesStore(
    state => state.favouriteMovies
  );

  return (
    <div className="mt-20 p-6">
      <div className="max-h-1/4 mt-1 flex flex-col items-center px-20">
        <div className="w-full space-y-4 overflow-y-auto rounded-lg  border-gray-200 px-6 py-4">
          {!isEmpty(favouriteMovies) ? (
            favouriteMovies?.map(({ imdbID, Title, imdbRating }) => (
              <div
                className="flex items-center justify-between rounded-lg bg-gray-100 p-4 shadow-md"
                key={imdbID}
              >
                <Typography className="font-bold text-gray-700">
                  {Title}
                </Typography>
                <div className="flex  items-end gap-2">
                  <span className="text-sm text-gray-500">
                    {t("favourites.rating")} :{" "}
                  </span>
                  <span className="font-semibold text-gray-600">
                    {imdbRating}/10
                  </span>
                </div>
              </div>
            ))
          ) : (
            <EmptyPage text={t("favourites.empty")} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
