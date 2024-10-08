import{useState,useEffect} from "react"

function App() {
  const[amount,setAmount] = useState("");
  const[firstcurrency,setFirstCurrency] = useState("")
  const[secondcurrency,setSecondCurrency] = useState("")
  const[output,setOutput] = useState(null)

  useEffect(() => {
    async function convertCurrency(){
      if(amount && firstcurrency && secondcurrency){
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${firstcurrency}&to=${secondcurrency}`)
        const data = await res.json()
        setOutput((currate) => data.rates[secondcurrency])      
        
      }   
    }
    convertCurrency()
  },[amount,firstcurrency,secondcurrency])

  return (
    <div>
      <input type="text" id="textinput" value={amount} onChange={(e) => setAmount(Number(e.target.value))}/>
      <select value={firstcurrency} onChange={(e) => setFirstCurrency(e.target.value)} id="select-one">
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={secondcurrency} id="select-two" onChange={(e) => setSecondCurrency(e.target.value)}>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {output ? <p>{output}</p> : <p>Converts your rates</p>}
    </div>
  );
}

export default App;
