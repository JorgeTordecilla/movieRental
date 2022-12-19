import { MoviesCard } from "./MoviesCard";

export const MoviesList = ({ movies }) => {
  return (
    <div className="row row-cols-1 p-3 row-cols-md-3 g-3 d-sm-flex  justify-content-center">
      {movies.map((movie) => (
        <MoviesCard key={movie._id} {...movie} />
      ))}
    </div>
  );
};
