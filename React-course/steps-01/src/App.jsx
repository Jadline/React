import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
function App() {
  const[step,setStep] = useState(1)
 
  function handleIncreaseStep(){
    setStep(curstep => {
      if(curstep >= 3) return 1
      return curstep + 1
    })
  }
  function handleDecreaseStep (){
    setStep(curstep => {
      if(curstep <= 1) return 1
      return curstep - 1
    })
  }
  return (
    <div className="steps">
      <div className="numbers">
        <div className={step >= 1 ? "active" : ''}>1</div>
        <div className ={step >=2 ? "active" : ' '}>2</div>
        <div className ={step >= 3 ? "active" : ''}>3</div>
      </div>
      <p className="message">
        Step : {step} : {messages[step - 1]}
      </p>
      <div className="buttons">
        <button style={{backgroundColor : "#7920f2",color : "#fff"}} onClick={handleDecreaseStep}>Previous</button>
        <button style={{backgroundColor : "#7920f2",color : "#fff"}} onClick={handleIncreaseStep}>Next</button>
      </div>
    </div>
  )  
}

export default App
