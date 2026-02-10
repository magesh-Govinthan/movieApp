import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./MovieDetail.css";
import { FaStarAndCrescent } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { MovieContext } from "../context/MovieContext";

function MovieDetail() {
  const [movieDetail, setMovieDetail] = useState([]);
  const { id } = useContext(MovieContext);
  useEffect(() => {
    axios
      .get(`http://www.omdbapi.com/?apikey=4b9dc54&i=${id}`)
      .then((data) => setMovieDetail(data.data));
  }, []);
  console.log(movieDetail);

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
        <p>Rating:{movieDetail.imdbRating}/10</p>
        <p>cast :</p>
        <p>{movieDetail.Actors}</p>
      </div>
      </div>
    </div>
  );
}

export default MovieDetail;
