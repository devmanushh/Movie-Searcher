import axios from "axios";

const fetch = ({ searchTerm, page, year, type }) =>
  axios.get("/", { params: { s: searchTerm, page, y: year, type } });

const show = imdbID => axios.get("/", { params: { i: imdbID } });

const moviesApi = { fetch, show };

export default moviesApi;
