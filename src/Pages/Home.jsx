import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import MovieDetail from "./MovieDetail";
import "./Home.css";
import { Outlet, useNavigate } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";
import { FaAngleLeft, FaAngleRight, FaSearch } from "react-icons/fa";
import NotFount from "./NotFount";
import Loader from "./loader";

function Home() {
  const { updateMovieId } = useContext(MovieContext);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [movieSearchResult, setMovieSearchResult] = useState("");
  const [movieSearchInput, setMovieSearchInput] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [submit, setSubmit] = useState("");
  const [error, setError] = useState("");
  const [movieType, setMovieType] = useState("");
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    if (submit.length > 0) {
      setLoader(true);
      axios
        .get(`https://www.omdbapi.com/?apikey=4b9dc54&s=${submit}&page=${page}&type=${movieType}`)
        .then((data) => {
          
          if (data.data.Response === "False") {
            setMovieData([]);
            setError(`${data?.data?.Error} try to search any other names`);
          } else {
            setError(false);
            setMovieData(data.data.Search);
            setTimeout(() => {
              setMovieSearchResult(data.data.totalResults);
            },)
           

            console.log(+movieSearchResult);
          }

          console.log(data);
          setLoader(false);
        })
        .catch((err) => {
           setLoader(false);
          setMovieSearchInput("");
        });
    }
  }, [submit, page, movieType]);
  console.log(movieData);

  const getPageRange = (cur, total) => {
    const pagesRange = [];
    pagesRange.push(1);
    const range = {
      start: Math.max(2, cur - 1),
      end: Math.min(total - 1, cur + 1),
    };
    if (range.start > 2) {
      pagesRange.push("...");
    }
    for (let i = range.start; i <= range.end; i++) {
      pagesRange.push(i);
    }
    if (range.end < total) {
      pagesRange.push("...");
    }
    if (total - 1 > 1) {
      pagesRange.push(total);
    }
    return pagesRange;
  };

  const totalPage = +movieSearchResult;
  const finalTotalPage = Math.ceil(totalPage / 10);
  const pagesRange = getPageRange(page, finalTotalPage);
  console.log(pagesRange);

  const handleSubmit = () => {
    setSubmit(movieSearchInput);
    setMovieSearchInput('');
  };
  const handleMovieSearch = (e) => {

    setMovieType('');
    setSubmit('');
    setError('');
    setMovieSearchInput(e.target.value);


  };
  const handlePrevious = () => {
    setPage((prev) => prev - 1);
  };
  const handleNext = () => {
    setPage((prev) => prev + 1);
  };
  const handleMovie = (imdbID) => {
    updateMovieId(imdbID);
    navigate("movie");
  };

  const handlePageNum = (item) => {
    setPage(item);
  };
  return (


    <>
      <div
        style={{
          background: "whitesmoke",
          color: "black",
          position: "relative",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0px",
              width: "400px",
              paddingTop: "20px",
            }}
          >

            <input
              type="text"
              value={movieSearchInput}
              placeholder="Search movie"
              onChange={(e) => handleMovieSearch(e)}
            />
            <button
              onClick={() => {
                handleSubmit();
              }}
              className="btn-class"
            >
              <FaSearch />
              Search
            </button>
            <select onChange={(e) => setMovieType(e.target.value.toLowerCase())}>
              <option defaultValue='select'>Select</option>
              <option value="Movie">Movies</option>
              <option value="Series">Series</option>
              <option value="Episode">Episode</option>
            </select>
          </div>

        </div>
        {
          loader ? <Loader /> : <div>
            <div className="parent">
              {movieData.length > 0 &&
                movieData.map((item) => {
                  return (
                    <div
                      onClick={() => handleMovie(item.imdbID)}
                      className="cart-container"
                    >
                      <div className="cart">
                        <img src={item.Poster}></img>
                        <p className="para1">{item.Title}</p>
                        <p className="para2">{item.Year}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
            {movieData.length > 0 && (
              <div className="buttonClick">
                <button
                  onClick={handlePrevious}
                  disabled={page === 1}
                  className="button"
                >
                  <FaAngleLeft />
                </button>
                <div className="page">
                  {pagesRange.map((item) =>
                    item === "..." ? (
                      <span className="span1">...</span>
                    ) : (
                      <button
                        className="button"
                        style={{
                          backgroundColor: item === page ? "green" : "lightgray",
                        }}
                        onClick={() => handlePageNum(item)}
                      >
                        {item}
                      </button>
                    ),
                  )}
                </div>
                <button onClick={handleNext} className="button">
                  <FaAngleRight />
                </button>
              </div>
            )}
          </div>
        }
      </div>
      {movieData.length === 0 && movieType !== 'select' && movieType !== '' && submit !== '' && <NotFount movieType={movieType} submit={submit} />}
      {error && <NotFount message={error} />}
      <Outlet />
    </>

  );

}

export default Home;