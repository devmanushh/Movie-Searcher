import { useEffect, useState } from "react";

import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Close, Filter as FilterIcon } from "neetoicons";
import { Checkbox, Dropdown, Input, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import { DEFAULT_PAGE_NUMBER, yearSchema } from "./constants";

const Filter = ({ searchTerm }) => {
  const { t } = useTranslation();

  const history = useHistory();

  const queryParams = useQueryParams();

  const [yearInput, setYearInput] = useState(queryParams.year || "");
  const [yearError, setYearError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleUpdateYearParams = useFuncDebounce(yearValue => {
    const params = {
      ...queryParams,
      year: yearValue || undefined,
      page: searchTerm ? DEFAULT_PAGE_NUMBER : undefined,
    };
    history.push(buildUrl(routes.root, filterNonNull(params)));
  });

  useEffect(() => {
    setYearInput(queryParams.year || "");
  }, [queryParams.year]);

  const handleYearChange = async value => {
    setYearInput(value);
    try {
      await yearSchema.validate(value);
      setYearError("");
      handleUpdateYearParams(value);
    } catch (error) {
      setYearError(error.message);
    }
  };

  const handleTypeChange = typeValue => {
    let newType = undefined;

    if (!queryParams.type) {
      newType = typeValue === "movie" ? "series" : "movie";
    } else if (queryParams.type === typeValue) {
      newType = undefined;
    }

    const params = {
      ...queryParams,
      type: newType,
      page: searchTerm ? DEFAULT_PAGE_NUMBER : undefined,
    };
    history.push(buildUrl(routes.root, filterNonNull(params)));
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  return (
    <Dropdown
      closeOnSelect={false}
      isOpen={isDropdownOpen}
      customTarget={
        <FilterIcon
          className="h-5 w-5 cursor-pointer text-gray-700"
          onClick={() => setIsDropdownOpen(true)}
        />
      }
      onClose={() => setIsDropdownOpen(false)}
    >
      <div className="p-5">
        <div className="flex justify-end">
          <Close
            className="h-4 w-4 cursor-pointer"
            onClick={handleDropdownClose}
          />
        </div>
        <div className="mb-4">
          <Typography className="mb-2 font-medium" variant="body1">
            {t("filters.year")}
          </Typography>
          <Input
            className="w-full"
            error={yearError}
            pattern="[0-9]*"
            placeholder={t("filters.yearPlaceholder")}
            type="number"
            value={yearInput}
            onChange={({ target: { value } }) => handleYearChange(value)}
            onKeyDown={event => {
              if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
                event.preventDefault();
              }
            }}
          />
        </div>
        <div>
          <Typography className="mb-2 font-medium" variant="body1">
            {t("filters.type")}
          </Typography>
          <div className="flex gap-6">
            <Checkbox
              checked={!queryParams.type || queryParams.type === "movie"}
              label={t("movie.type.movie")}
              onChange={() => handleTypeChange("movie")}
            />
            <Checkbox
              checked={!queryParams.type || queryParams.type === "series"}
              label={t("movie.type.series")}
              onChange={() => handleTypeChange("series")}
            />
          </div>
        </div>
      </div>
    </Dropdown>
  );
};

export default Filter;
