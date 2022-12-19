import { types } from "../types/types";

const initialState = {
  movies: [],
  rentals: [],
};

export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.moviesLoaded:
      return {
        ...state,
        movies: action.payload,
      };
    case types.moviesLoadedRent:
      return {
        ...state,
        rentals: action.payload,
      };

    default:
      return state;
  }
};
