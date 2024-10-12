import {useState,useEffect} from "react"
import "./index.css"

const weatherIcons = {
  Thunderstorm: "/images/lighgtning-bolt-.png",
  Drizzle: "/images/drizzle.png",
  Rain: "/images/heavy-rain.png",
  Snow: "/images/snow.png",
  Clear: "/images/clear-sky.png",
  Mist: "/images/mist.png",
  Clouds: "/images/cloud.png",
  Smoke: "/images/smoke.png",
  Haze: "/images/haze.png",
  Dust: "/images/dust.png",
  Fog: "/images/fog.png",
  Sand: "/images/sand.png", 
  Sun: "/images/sun.png", 
  Tornado: "/images/tornado.png",
  Default :  "/images/carbon-dioxide.png"
};




function App() {
  const[city,setCity] = useState("")
  return (
    <div className="container">
      <Background city ={city}/>
      <Sidebar city={city} onsetCity={setCity}/>   
      
    </div>
   
  );
}
function Background ({city}){
 return (
  <div className="background">
   <BackgroundContent city={city}/>
  </div>
 )
}

function BackgroundContent({city}){
  return(
    <div>
      <p className="city-name">{city}</p>
      <div>
        <FormatDate/>
      </div>
     
    </div>
  )
}
function FormatDate(){
 
  const date = new Date()
  const hours = date.getHours().toString().padStart(2,'0')
  const minutes = date.getMinutes().toString().padStart(2,'0')
  const seconds = date.getSeconds().toString().padStart(2,'0')
  // const refinedHours = hours < 10 ? `0${hours}` : `${hours}`
  // const refinedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
  // const  refinedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
  const newTime = `${hours}:${minutes}:${seconds}`
  const[time,setTime] = useState(newTime)
  const stringDate = date.toDateString()
  // console.log(stringDate)
  useEffect(() => {
    const intervalid = setInterval(() => {
      const newdate = new Date()
      const hours = newdate.getHours().toString().padStart(2,'0')
      const minutes = newdate.getMinutes().toString().padStart(2,'0')
      const seconds = newdate.getSeconds().toString().padStart(2,'0')
      setTime(`${hours}:${minutes}:${seconds}`)
    },1000)

    return() => clearInterval(intervalid)
  },[])
  return(
    <>
      <p className="time">
       {time}
      </p>
      <p className="date-string">{stringDate}</p>

    </>
  )
}






function Sidebar({city,onsetCity}){
  const apiKey = "099734bb9456f6b537a7de244983f461"
  // const[city,setCity] = useState("")
  const[debounceCity,setdebounceCity] = useState(city)
  const[showdata,setShowdata] = useState(false)
  const[weatherdata,setweatherData] = useState({})
  console.log(weatherdata)

  useEffect(() => {
    const handler = setTimeout(() => {
      setdebounceCity(city)
    },500)
    return () => {
      clearTimeout(handler)
    }
  },[city])
  

  useEffect(() => {
    async function getWeatherData(){
      if(debounceCity){
        try {
          const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${debounceCity}&appid=${apiKey}`)

          if(!res.ok) throw new Error("There was an error fetching data!")
          const data = await res.json()
          setweatherData({...data})
          
        }
        catch(err){
          console.log(err.message)
        }
        
      }
    }
    getWeatherData()
  },[debounceCity])

  function handleSearch(){
     setShowdata(true)
  }
 let weatherCondition =  weatherdata?.weather?.[0]?.main
 let iconSrc = weatherIcons[weatherCondition] || weatherIcons["Default"]
  return(
    <div className ="sidebar">
      <div className="sidebar-container">
        <div className="img-content">
          <img src={iconSrc} alt="cloud" className="cloud-icon"/>
          <p className="location-name">{weatherCondition ? weatherCondition : "default weather"}</p>
          <hr/>
        </div>
      
        <div className="search-field">
          <input type="text" placeholder="search any city" id="search-city" value={city} onChange={(e) => onsetCity(e.target.value)}/>
          <button onClick={handleSearch}>🔍</button>
        </div>    
        { showdata ? <>
          <div className="city">{weatherdata?.name},{weatherdata?.sys?.country}</div>
          <div className="weather-info">
            <p><span>Temperature</span><span>{((weatherdata?.main?.temp) - 273).toFixed(1)} °C</span></p>
            <p><span>Humidity</span><span>{weatherdata?.main?.humidity}%</span></p>
            <p><span>Visibility</span><span>{weatherdata?.visibility} mi</span></p>
            <p><span>Wind Speed</span><span>{weatherdata?.wind?.speed} km/h</span></p>
          </div>
        </> : <div className="type-city-message">Please type in a city of your choice!</div>}  
        </div>
    </div>
  )
}


export default App;
