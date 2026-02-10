import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import MovieDetail from "./MovieDetail";
import "./Home.css";
import { Outlet, useNavigate } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";
import { FaAngleLeft, FaAngleRight, FaSearch } from "react-icons/fa";
import NotFount from "./NotFount";

function Home() {
  const { updateMovieId } = useContext(MovieContext);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [movieSearchResult, setMovieSearchResult] = useState("");
  const [movieSearchInput, setMovieSearchInput] = useState("");
  const [movieData, setMovieData] = useState([]);
  const[submit,setSubmit]=useState("");
  const[error,setError]=useState("");
  useEffect(() => {
    if(submit.length>0){
    axios
      .get(
        `http://www.omdbapi.com/?apikey=4b9dc54&s=${submit}&page=${page}`,
      )
      .then((data) => {
        if (data.data.Response === "False") {
          setMovieData([]);
          throw new Error("Response coming as incorrect datails,try searching");
          
        } else {
          setError(false);
          setMovieData(data.data.Search);
          setMovieSearchResult(data.data.totalResults);

          console.log(+movieSearchResult);
        }

        console.log(data);
      })
      .catch((err) => {
      setError(`${err},Type the different Movie names`);
      setMovieSearchInput("");
    });
}}, [submit, page]);

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
    setSubmit(movieSearchInput)
  }
  const handleMovieSearch = (e) => {
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
    <>{error&&<NotFount message={error} err={setError}/>}
      <div
        style={{
          background: "whitesmoke",
          color: "black",
          position: "relative",
        }}
      >
        <div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"0px",width:"300px", paddingTop:"20px"}}>
          <input
            type="text"
            placeholder="Search movie"
            onChange={(e) => handleMovieSearch(e)}
          />
          <button onClick={()=>{handleSubmit()}} className="btn-class"><FaSearch/>Search</button>
         </div>
         </div>
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
            <button onClick={handlePrevious} disabled={page === 1}  className="button">
              <FaAngleLeft />
            </button>
            <div className="page"
              
            >
              {pagesRange.map((item) =>
                item === "..." ? (
                  <span className="span1">...</span>
                ) : (
                  <button  className="button"
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
      <Outlet />
    </>
  );
}

export default Home;
