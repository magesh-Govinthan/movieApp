import { createContext, useReducer } from "react";

const ACTION = {
  SET_MOVIE_ID: "SET_MOVIE_ID",
};

const initState = {
  id: "",
};
const movieReducer = (state, action) => {
  console.log(state, action);

  const { type, payload } = action;
  switch (type) {
    case ACTION.SET_MOVIE_ID:
      return { ...state, ...payload };
    default:
      throw new Error(`unhandle type in cart reducer ${type}`);
  }
};

export const MovieContext = createContext({
  id: "",
  updateMovieId: () => {},
});

export const MovieProvider = ({ children }) => {
  const [{ id }, dispatch] = useReducer(movieReducer, initState);
  const updateMovieId = (IMDBid) => {
    const payload = {
      id: IMDBid,
    };
    console.log(payload);

    dispatch({ type: "SET_MOVIE_ID", payload });
  };

  const value = {
    id,
    updateMovieId,
  };
  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
