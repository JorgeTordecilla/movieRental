import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moviesLoaded, moviesStartLoading } from "../../actions/moviesActions";
import { Navbar } from "./Navbar";
import { MoviesList } from "../movies/MoviesList";

export const MainScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(moviesStartLoading());
    })();
  }, [dispatch]);

  const { movies } = useSelector((state) => state.movies);

  const handleSortAsc = () => {
    movies.sort(function (a, b) {
      return a.genre.localeCompare(b.genre);
    });
    dispatch(moviesLoaded(movies));
  };

  const handleSortDsc = () => {
    movies.sort(function (a, b) {
      return b.genre.localeCompare(a.genre);
    });
    dispatch(moviesLoaded(movies));
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <button className="btn btn-info mt-2 " onClick={handleSortAsc}>
          ↑
        </button>
        <button className="btn btn-info mt-2 ml-2 " onClick={handleSortDsc}>
          ↓
        </button>
        <MoviesList movies={movies} />
      </div>
    </>
  );
};
