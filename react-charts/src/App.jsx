// import Line from "./Components/line"
// // import BarGraph from './Components/bar'
// // import PieGraph from './Components/pie'

// function App() {
 
//   return(
//     <div className='app'>
//       <Line/>
//       {/* <BarGraph/> */}
//       {/* <PieGraph/> */}
//     </div>
//   )
// }

// export default App
const data = [
    { x: 1, y: 50 },
    { x: 2, y: 80 },
    { x: 3, y: 65 },
    { x: 4, y: 90 },
    { x: 5, y: 100 }
];

import LineChart from './D3JS/linechart'
function App() {
 
  return(
    <div>
      <LineChart data ={data}/>
    </div>
  )
}

export default App
