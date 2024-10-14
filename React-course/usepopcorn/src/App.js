import { useState,useEffect,useRef} from "react";
import StarRating from "./starRating"
import {useMovies} from "./useMovies.js"
import {useLocalStorageState} from "./useLocalStorageState.js"
import {useKey} from "./useKey.js"

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "16c9adb9"

export default function App() {
  const[query,setQuery] = useState("")
  
  const[selectedid,setSelectedid] = useState(null)
  const tempQuery = "interstellar"

  const{movies,error,isloading} = useMovies(tempQuery)
  const[watched,setWatched] = useLocalStorageState([],'watched')

  // const [watched, setWatched] = useState(() => {
  //   const storedValues = localStorage.getItem('watched')
  //   return JSON.parse(storedValues)
  // }); 

  function handleSelectMovie(id){
    setSelectedid(selectedid => id === selectedid ? null : id)
  }
  function handleCloseMovie(){
    setSelectedid(null)
  }
  function handleAddWatched(movie){
    
    setWatched((watched) => [...watched,movie])

    // localStorage.setItem('watched',JSON.stringify([...watched,movie]))
  }
  function handleDeleteMovie(id){
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
  }
  
 

 

 


  return (
    <>     
      <Navbar>
        <Search query={query} setQuery={setQuery}/>
        <NumResults movies={movies}/>
      </Navbar>
      <Main>
        <Box>
            {isloading && <Loader/>}
            {/* {isloading ? <Loader/> : <MovieList movies={movies} />} */}
            {!isloading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie}/>}
            {error && <ErrorMessage message={error}/>}
        </Box>
        <Box>                
            {
              selectedid ? 
              <MovieDetails selectedid={selectedid} onCloseMovie={handleCloseMovie} onAddWatched={handleAddWatched} watched={watched}/> : 
            <>
              <WatchedSummary watched={watched}/>
              <WatchedMovieList watched={watched} onDeleteWatched={handleDeleteMovie}/>
            </>
            }          
        </Box>
      </Main>
    </>
  );
}
//this component will be called if there is a selectedid
function MovieDetails({selectedid,onCloseMovie,onAddWatched,watched}){
  const [movie,setMovie] = useState({})
  const[isloading,setIsLoading] = useState(false)
  const[userRating,setUserRating] = useState('')

  

  const countRef = useRef(0)

  useEffect(() => {
    if(userRating)
      countRef.current = countRef.current + 1
  },[userRating])

 
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedid)
  const watcheduserRating = watched.find((movie) => movie.imdbID === selectedid)?.userRating
  const{
    Title : title,
    Year :year,
    Poster : poster, 
    Runtime : runtime,
    imdbRating,
    Plot : plot,
    Released : released,
    Actors : actors,
    Director : director,
    Genre : genre

  } = movie;

  // const[avgRating,setAverageRating] = useState(0)
  function handleAdd(){
    const newWatchedMovie = {
        imdbID : selectedid,
        title,
        year,
        poster,
        imdbRating : Number(imdbRating),
        runtime: Number(runtime.split(" ").at(0)),
        userRating,
        countRatingDecisions : countRef.current
    }

    onAddWatched(newWatchedMovie)
    // setAverageRating(Number(imdbRating))
    //the state of the of the average rating is asynchoronous so we need to use a call back function here
    // setAverageRating(avgRating => (avgRating + userRating)/2)
    // alert(avgRating)
    onCloseMovie()

  }

  useKey('Escape',onCloseMovie)
//   useEffect(() => {
//     function callback(e){
//       if(e.code === "Escape"){
//         onCloseMovie()
       
//       }
//     }
//     document.addEventListener('keydown',callback)
//     return () => {
//       document.removeEventListener('keydown',callback)
//     }
   
// },[onCloseMovie])
  
  useEffect(()=> {
    
    async function getMovieDetails(){
      setIsLoading(true)

      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedid}`)
      // if(!res.ok) throw new Error("There was an error fetching the data")
      const data  = await res.json()
      setMovie(data)
      setIsLoading(false)
    }
    getMovieDetails()
  },[selectedid])

  useEffect(() => {
    if(!title) return
    document.title = `Movie | ${title}`
    return () => {
      document.title = "usePopcorn"
    }
  },[title])
  return (
    <div className="details">
      {isloading ? <Loader/> : 
      <>
      <header>
        <img src={poster} alt={`poster of ${movie} movie`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>{released} &bull; {runtime}</p>
          <p>{genre}</p>
          <p><span>⭐</span>{imdbRating} IMDb rating</p>
        </div>
      </header>
      {/* <p>{avgRating}</p> */}
      <section>
       <div className="rating">
          {
         
          !isWatched ? 
          <> 
            <StarRating maxRating={10} size={24} onsetRating={setUserRating}/>
            {userRating > 0 && (<button className="btn-add" onClick={handleAdd}>+ Add to list</button>)}
          </>
          : <p>You rated this movie {watcheduserRating}</p>
        }

        </div>
        <p><em>{plot}</em></p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
      </>
      }
      <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
      {selectedid}</div>
  )
}

function Loader(){
  return(
    <p className="loader"> Loading...</p>
  )
}
function ErrorMessage({message}){
  return(
    <p className="error">
      <span>🚫</span>{message}
    </p> 
  )
}
function Navbar({children}) {
  
  return(
    <nav className="nav-bar">
       <Logo/>
       
     {children}
  </nav>
  )
}
function Logo(){
  return(
  <div className="logo">
    <span role="img">🍿</span>
    <h1>usePopcorn</h1>
</div>
  )
}
function Search({query,setQuery}){
  const inputEl = useRef(null);

  useKey('Enter', function() {
    // Check if the input is not already focused
    // if (document.activeElement === inputEl.current) return
      inputEl.current.focus(); // Focus the input
      setQuery(""); // Reset the query
      
    })
    

  

  // useEffect(() => {
  //   function callback(e) {
  //     if (e.code === "Enter") {
  //       inputEl.current.focus();
  //       setQuery("");
  //     }
  //   }

  //   // Adding the event listener
  //   document.addEventListener('keydown', callback);

  //   // Cleanup function to remove the event listener
  //   return () => {
  //     document.removeEventListener('keydown', callback); // Corrected this line
  //   };
  // }, [setQuery]);
  
  return(
    <input
    className="search"
    type="text"
    placeholder="Search movies..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    ref={inputEl}
  />
  )
}

function NumResults({movies}){
    return(
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
    </p>
    )
}
function Main({children}){
  return(
    <main className="main">
      {children}
      
   
  </main>
  )
}


function Box({children}){
  
  const [isOpen, setIsOpen] = useState(true);
  return(
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  )
}
// function WatchedBox(){
//   const [watched, setWatched] = useState(tempWatchedData); 
//   const [isOpen2, setIsOpen2] = useState(true);
  
//   return(
//     <div className="box">
//     <button
//       className="btn-toggle"
//       onClick={() => setIsOpen2((open) => !open)}
//     >
//       {isOpen2 ? "–" : "+"}
//     </button>
//     {isOpen2 && (
//       <>      
//         <WatchedSummary watched={watched}/>
//         <WatchedMovieList watched={watched}/> 
//       </>
//     )}
//   </div>
//   )
// }
function MovieList({movies,onSelectMovie}){
 
  return(
    <ul className="list list-movies">
      {movies?.map((movie) => <Movie movie={movie}  key={movie.imdbID} onSelectMovie={onSelectMovie}/>)}
  </ul>
  )
}
function  Movie({movie,onSelectMovie}){
  return(
    <li onClick={() => onSelectMovie(movie.imdbID)} >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
  </li>
  )
}

function WatchedSummary({watched}){
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return(
    <div className="summary">
    <h2>Movies you watched</h2>
    <div>
      <p>
        <span>#️⃣</span>
        <span>{watched.length} movies</span>
      </p>
      <p>
        <span>⭐️</span>
        <span>{avgImdbRating.toFixed(2)}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{avgUserRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{Math.floor(avgRuntime)} min</span>
      </p>
    </div>
  </div>
  )
}
function WatchedMovieList({watched,onDeleteWatched}){
  return(
    <ul className="list">
    {watched.map((movie) => <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched}/>)}
  </ul>
  )
}
function WatchedMovie({movie,onDeleteWatched}){
  return(
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
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
        <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>X</button>
      </div>
  </li>
  )
}