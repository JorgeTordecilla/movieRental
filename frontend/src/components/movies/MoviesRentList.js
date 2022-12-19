import { useDispatch } from "react-redux";
import { returnRentMoviesStartLoading } from "../../actions/moviesActions";

export const MoviesRentList = ({
  date,
  genre,
  isNewMovie,
  movieTitle,
  movieUid,
  userUid,
  _id,
}) => {
  const dispatch = useDispatch();

  const handleReturn = () => {
    dispatch(returnRentMoviesStartLoading(_id, movieUid));
  };
  return (
    <div className="container" key={_id}>
      <div className="list-group">
        <div className="list-group-item list-group-item ">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{movieTitle}</h5>
            <small>{new Date(date).toDateString()}</small>
          </div>
          <p className="mb-1">Genre: {genre}</p>
          <small>New movie : {isNewMovie ? "Yes" : "NO"}</small>
          <br />

          <button
            className="btn btn-outline-success text-center"
            onClick={handleReturn}
          >
            return
          </button>
        </div>
      </div>
      <br />
    </div>
  );
};
