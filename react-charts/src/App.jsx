import HorizontalBarChart from "./Components/D3barCharts/barchartOne";
import AvailabilityStatusPie from "./D3js/AvailabilityPie";
import BrandPie from "./D3js/BrandPie";
import PieChart from "./D3js/PieChart";
import SalesPie from "./D3js/Sales";

function App(){
  return(
    // <PieChart/>
    <div className='container'>
      {/* <SalesPie/> */}
      {/* <BrandPie/> */}
      {/* <AvailabilityStatusPie/> */}
      <HorizontalBarChart/>
    </div>
  )
}
export default App