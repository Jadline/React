import NamesBar from "./Components/D3barCharts/barChart3";
import HorizontalBarChart from "./Components/D3barCharts/barchartOne";
import PopulationChart from "./Components/D3barCharts/barChartTwo";
import DonutOne from "./Components/D3donuts/donut1";
import LineChart from "./Components/D3LineChart/LineOne";
import LineTwo from "./Components/D3LineChart/LineTwo";
import AvailabilityStatusPie from "./D3js/AvailabilityPie";
import BrandPie from "./D3js/BrandPie";
import PieChart from "./D3js/PieChart";
import SalesPie from "./D3js/Sales";
const data = [
  {name:"Mark", value: 90},
  {name:"Robert", value: 12},
  {name:"Emily", value: 34},
  {name:"Marion", value: 53},
  {name:"Nicolas", value: 98},
  {name:"Mélanie", value: 23},
  {name:"Gabriel", value: 18},
  {name:"Jean", value: 104},
  {name:"Paul", value: 2},
]



function App(){
  return(
    // <PieChart/>
    <div className='container'>
      {/* <SalesPie/> */}
      {/* <DonutOne/> */}
      {/* <LineChart/> */}
      <LineTwo/>
      {/* <BrandPie/> */}
      {/* <AvailabilityStatusPie/> */}
      {/* <HorizontalBarChart/> */}
      {/* <PopulationChart/> */}
      {/* <NamesBar data ={data}/> */}
    </div>
  )
}
export default App