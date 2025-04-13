import { OMDB_API_URL, OMDB_API_KEY } from "constants";

import {
  keysToCamelCase,
  serializeKeysToSnakeCase,
} from "@bigbinary/neeto-cist";
import axios from "axios";
import { t } from "i18next";
import { Toastr } from "neetoui";
import { evolve } from "ramda";

const showSuccessToastr = response => {
  const {
    data: { Error },
  } = response;
  if (response.data?.Response === "False") {
    Toastr.error(t(`${Error}`), { autoClose: 1500 });
  }
};

const showErrorToastr = error => {
  if (error.message === t("error.networkError")) {
    Toastr.error(t("error.noInternetConnection"), { autoClose: 1500 });
  } else if (error.response?.status !== 404) {
    Toastr.error(t("error.generalError"), { autoClose: 1500 });
  }
};

const transformResponseKeysToCamelCase = response => {
  if (response.data) response.data = keysToCamelCase(response.data);
};

const responseInterceptors = () => {
  axios.interceptors.response.use(
    response => {
      transformResponseKeysToCamelCase(response);
      showSuccessToastr(response);

      return response.data;
    },
    error => {
      showErrorToastr(error);

      return Promise.reject(error);
    }
  );
};

const requestInterceptors = () => {
  axios.interceptors.request.use(
    evolve({ data: serializeKeysToSnakeCase, params: serializeKeysToSnakeCase })
  );
};

const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

export default function initializeAxios() {
  axios.defaults.baseURL = OMDB_API_URL;
  axios.defaults.params = {
    apikey: OMDB_API_KEY,
  };
  setHttpHeaders();
  responseInterceptors();
  requestInterceptors();
}
