import {useState,useEffect} from "react"
export function useMovies (tempQuery){
    const [movies, setMovies] = useState([]);
    const[isloading,setIsLoading] = useState(false);
    const[error,setError] = useState("")

    const KEY = "16c9adb9"

    useEffect(() => {
        const controller = new AbortController()
        async function fetchMovies(){
          try{
            setIsLoading(true)
            setError("")
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${tempQuery}`,{signal : controller.signal})
            
            if(!res.ok) throw new Error("Something went wrong with fetching movies")
            const data = await res.json()
            
            if(data.Response === 'false')throw new Error("Movies not found")
            setMovies(data.Search)
          setError("")
           
           
        }
          catch(err) {
              // console.error(err.message)
              if(error.name !== "AbortError"){
                setError(err.message)
              }
                     
          }
          finally {
            setIsLoading(false)
          }
        }
        fetchMovies()
        return() => {
          controller.abort()
        }
       
      },[error.name,tempQuery])
    return {movies,error,isloading}
}
