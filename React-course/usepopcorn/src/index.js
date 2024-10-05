import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import StarRating from './starRating';
// import {useState} from "react"

// function Test(){
//   const[movieRating,setMovieRating] = useState(0)
//   return (
//     <div>
//       <StarRating color="blue" maxRating={10} onsetRating = {setMovieRating}/>
//       <p>This movie was rated {movieRating} starts</p>
//     </div>
//   )
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={5} className ="test" messages = {['Terrible','Bad','Okay','good','amazing']} defaultRating={3}/> */}
    
    
  </React.StrictMode>
);

