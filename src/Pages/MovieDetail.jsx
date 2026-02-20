import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./MovieDetail.css";
import { MovieContext } from "../context/MovieContext";

function MovieDetail() {
  const [movieDetail, setMovieDetail] = useState([]);
  const { id } = useContext(MovieContext);
  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?apikey=4b9dc54&i=${id}`)
      .then((data) => setMovieDetail(data.data));
  }, []);

  return (
    <div className="pro-parent">
      <div className="pro-parent1">
      <img className="image" src={movieDetail.Poster} />
      <div className="child1"></div>
      <div className="child-pro">

        <h1>{movieDetail.Title}</h1>
        <span>
          {movieDetail.Year}, {movieDetail.Genre}
        </span>
        <p>{movieDetail.Plot}</p>
        <p>{movieDetail && movieDetail.imdbRating &&`Rating:${movieDetail.imdbRating}/10`}</p>
        <p>{movieDetail && movieDetail.Actors && `cast:${ movieDetail.Actors}/10`}</p>
       
      </div>
      </div>
    </div>
  );
}

export default MovieDetail;