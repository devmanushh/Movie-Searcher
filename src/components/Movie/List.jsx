import React from "react";

import Card from "./Card";

const List = ({ movies }) => (
  <div className="grid h-full grid-cols-2 gap-6 overflow-y-scroll sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {movies.map(movie => (
      <Card key={movie.imdbID} movie={movie} />
    ))}
  </div>
);

export default List;
