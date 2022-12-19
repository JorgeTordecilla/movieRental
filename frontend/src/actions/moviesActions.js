import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";

export const moviesLoaded = (movies) => ({
  type: types.moviesLoaded,
  payload: movies,
});

export const rentMoviesLoaded = (movies) => ({
  type: types.moviesLoadedRent,
  payload: movies,
});

export const moviesRent = (movies) => ({
  type: types.moviesRent,
  payload: movies,
});

export const moviesStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken("movies/movies");
      const body = await resp.json();
      dispatch(moviesLoaded(body.movies));
    } catch (error) {
      console.log(error);
    }
  };
};

export const moviesStartRent = (movieUid, userUid) => {
  return async (dispatch) => {
    try {
      await fetchConToken("movies/rent", { movieUid, userUid }, "POST");
      dispatch(moviesStartLoading());
    } catch (error) {
      console.log(error);
    }
  };
};

export const rentMoviesStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken("movies/rentmovies");
      const body = await resp.json();
      dispatch(rentMoviesLoaded(body.movies));
    } catch (error) {
      console.log(error);
    }
  };
};

export const returnRentMoviesStartLoading = (uid, movieUid) => {
  return async (dispatch) => {
    try {
      await fetchConToken("movies/returnmovies", { uid, movieUid }, "POST");

      dispatch(rentMoviesStartLoading());
    } catch (error) {
      console.log(error);
    }
  };
};
