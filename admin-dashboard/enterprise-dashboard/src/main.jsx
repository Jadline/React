import React from "react"
import ReactDom from "react-dom/client"
import "./index.css";
import App from "./App";
import {browserRouter} from "react-router-dom"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <browserRouter>
      <App />
    </browserRouter>
  
  </StrictMode>,
)
