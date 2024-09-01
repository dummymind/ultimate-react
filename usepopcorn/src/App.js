import { useEffect, useRef, useState } from "react";
import StarRatingContainer from "./StarRating";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Navbar({ movies, query, setQuery }) {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <Search setQuery={setQuery} query={query} />
      <p className="num-results">
        Found <strong>{movies?.length}</strong> results
      </p>
    </nav>
  );
}

function Search({ query, setQuery }) {
  const firstref=useRef(null);
  useEffect(function(){
    firstref.current.focus()
    function keydownenter(e)
    {
      if(e.key==="Enter"){
        if(e.target!==firstref.current){
          firstref.current.focus()
          setQuery("")            
        }
    }

    }
    document.addEventListener("keydown",keydownenter);
  },[setQuery])
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      ref={firstref}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default function App() {
  const [movies, setMovies] = useState(null);
  const [watched, setWatched] = useState(getlocalstorage());
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  const [query, setQuery] = useState("");
  const [movieDetails, setMovieDetails] = useState(null);
  const [setratingvalue,onsetRating]=useState(0)

  function getlocalstorage()
  {
    const x=JSON.parse(localStorage.getItem("watched"));
    if(x)
    {
      return x
    }
    else
    {
      return []
    }
  }

  function setlocalstorage(x)
  {
    localStorage.setItem("watched",JSON.stringify(x));
  }

  function setRatingFunction(rating)
  {
    onsetRating(rating)
  }

  const [selectMovie, setSelectedMovie] = useState(null);

  function handleSelectMovie(id) {
    setSelectedMovie((movie) => (id === movie ? null : id));

  }
  function handleBack() {
    setSelectedMovie(null);
  }

  function addtoWatchlist(movie,setratingvalue){
    const newwatchedmovie={
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster:movie.Poster,
      runtime: Number(movie.Runtime.split(' ')[0]),
      imdbRating: movie.imdbRating,
      userRating: setratingvalue,
    }
    const x = [...watched,newwatchedmovie];
    setWatched(x);
    console.log(x)
    setlocalstorage(x);
    onsetRating(0);
    handleBack();
  }

  function deletetoWatchlist(id){
    const newwatchedmovies = watched.filter((movie) => movie.imdbID !== id);
    setWatched(newwatchedmovies);
    setlocalstorage(newwatchedmovies);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setIsError(false);
        var response = await fetch(
          `https://www.omdbapi.com/?apikey=4a3b711b&s=${query}`
        );

        if (response.ok) {
          var data = await response.json();
          console.log(data.response);
          setMovies(data.Search);
        } else {
          throw new Error(
            "You are offline. Please check your internet connection."
          );
        }
      } catch (error) {
        console.log(error.message);
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies(null);
      setIsError(false);
      return;
    }
    fetchData();
  }, [query]);

  useEffect(() => {
    async function getMovieDetails()
    { 
       const response = await fetch(`https://www.omdbapi.com/?apikey=4a3b711b&i=${selectMovie}`)
       const data = await response.json()
       console.log(data)
       setMovieDetails(data)
    }
    getMovieDetails()
    
  }, [selectMovie]);
  

  return (
    <>
      <Navbar movies={movies} query={query} setQuery={setQuery} />
      <Main>
        <Box>
          <ul className="list">
            {isLoading
              ? "Loading..."
              : (isError && <p>{isError}</p>) ||
                movies?.map((movie) => (
                  <Movie
                    key={movie.imdbID}
                    movie={movie}
                    handleSelectMovie={handleSelectMovie}
                  />
                ))}
          </ul>
        </Box>


        <Box>
          {selectMovie ? (
            <div className="details">
            <header>
            <p><button className="btn-back" onClick={handleBack} type="button">&larr;</button></p>
            <img src={movieDetails.Poster} alt={`Poster of ${selectMovie}`}></img>
            <div className="details-overview">
<h2>{movieDetails.Title}</h2>
<p>{movieDetails.Released} &bull; {movieDetails.Runtime}</p>
<p>{movieDetails.Genre}</p>
          <p>
            <span>⭐️</span>
            <span>{movieDetails.imdbRating} IMDb rating</span>
          </p>


            </div>
            
            </header>
            
            <section>
        <div className="rating">
          <StarRatingContainer size={24} maxRating={10} onsetRating={setRatingFunction} color="gold" ></StarRatingContainer>
          <button onClick={()=>addtoWatchlist(movieDetails,setratingvalue)} className="btn-add">+ Add to the list</button>
        </div>
        <p>
          <em>{movieDetails.Plot}</em>
        </p>
        <p>Starring {movieDetails.Actors}</p>
        <p>Directed by {movieDetails.Director}</p>
      </section>
</div>
          ) : (
            <>
              <div className="summary">
                <h2>Movies you watched</h2>
                <div>
                  <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                  </p>
                  <p>
                    <span>⭐️</span>
                    <span>{Number(avgImdbRating).toFixed(2)}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{Number(avgUserRating).toFixed(2)}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{Number(avgRuntime).toFixed(2)} min</span>
                  </p>
                </div>
              </div>

              <ul className="list">
                {watched.map((movie) => (
                  <li key={movie.imdbID}>
                    <img src={movie.Poster} alt={`${movie.Title} poster`} />
                    <h3>{movie.Title}</h3>
                    <button className="btn-delete" onClick={() => deletetoWatchlist(movie.imdbID)}>X</button>
                    <div>
                      <p>
                        <span>⭐️</span>
                        <span>{movie.imdbRating}</span>
                      </p>
                      <p>
                        <span>🌟</span>
                        <span>{movie.userRating}</span>
                      </p>
                      <p>
                        <span>⏳</span>
                        <span>{movie.runtime} min</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Movie({ movie, handleSelectMovie }) {
  return (
    <li key={movie.imdbID} onClick={() => handleSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function Box({ children }) {
  const [watched, setWatched] = useState(tempWatchedData);

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function ListBox({ movies }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && (
        <ul className="list">
          {movies?.map((movie) => (
            <li key={movie.imdbID}>
              <img src={movie.Poster} alt={`${movie.Title} poster`} />
              <h3>{movie.Title}</h3>
              <div>
                <p>
                  <span>🗓</span>
                  <span>{movie.Year}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function WatchBox() {
  const [watched, setWatched] = useState(tempWatchedData);

  const [isOpen2, setIsOpen2] = useState(true);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <div className="summary">
            <h2>Movies you watched</h2>
            <div>
              <p>
                <span>#️⃣</span>
                <span>{watched.length} movies</span>
              </p>
              <p>
                <span>⭐️</span>
                <span>{avgImdbRating}</span>
              </p>
              <p>
                <span>🌟</span>
                <span>{avgUserRating}</span>
              </p>
              <p>
                <span>⏳</span>
                <span>{avgRuntime} min</span>
              </p>
            </div>
          </div>

          <ul className="list">
            {watched.map((movie) => (
              <li key={movie.imdbID}>
                <img src={movie.Poster} alt={`${movie.Title} poster`} />
                <h3>{movie.Title}</h3>
                <div>
                  <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
