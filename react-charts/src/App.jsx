import NamesBar from "./Components/D3barCharts/barChart3";
import HorizontalBarChart from "./Components/D3barCharts/barchartOne";
import PopulationChart from "./Components/D3barCharts/barChartTwo";
import DonutOne from "./Components/D3donuts/donut1";
import LineChart from "./Components/D3LineChart/LineOne";
import LineTwo from "./Components/D3LineChart/LineTwo";
import Map from "./Components/D3worldmap/Map";
import WorldMap from "./Components/D3worldmap/WorldMap";
import AvailabilityStatusPie from "./D3js/AvailabilityPie";
import BrandPie from "./D3js/BrandPie";
import PieChart from "./D3js/PieChart";
import SalesPie from "./D3js/Sales";
import KPITrackingTable from "./Components/table";
import VerticalBar from "./Components/D3barCharts/VerticalChart";
import StackedBar from "./Components/D3barCharts/stackedBar";
import ChartLine from "./Components/linechart";
import Stocks from "./Components/D3LineChart/Stocks";
import GroupedBar from "./Components/D3barCharts/GroupedBar";
import MonthlyBar from "./Components/D3barCharts/groupedbarone";
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
const stackeddata = [
  { name: "Mark", air: 50, sea: 40 },
  { name: "Robert", air: 10, sea: 2 },
  { name: "Emily", air: 20, sea: 14 },
  { name: "Marion", air: 30, sea: 23 },
  { name: "Nicolas", air: 70, sea: 28 },
  { name: "Mélanie", air: 15, sea: 8 },
  { name: "Gabriel", air: 12, sea: 6 },
  { name: "Jean", air: 60, sea: 44 },
  { name: "Paul", air: 1, sea: 1 },
];
const timedata = [
  { date: "2024-01-01", air: 5, sea: 10 },
  { date: "2024-02-01", air: 6, sea: 9 },
  { date: "2024-03-01", air: 7, sea: 12 },
  { date: "2024-04-01", air: 5.5, sea: 8 },
  { date: "2024-05-01", air: 4, sea: 6 },
];

const stocksdata = [
  {
    "date": "2024-07-31",
    "openPrice": 548.34,
    "closePrice": 560.78
  },
  {
    "date": "2024-08-31",
    "openPrice": 730.12,
    "closePrice": 715.50
  },
  {
    "date": "2024-09-30",
    "openPrice": 990.87,
    "closePrice": 980.45
  },
  {
    "date": "2024-10-31",
    "openPrice": 865.22,
    "closePrice": 890.15
  },
  {
    "date": "2024-11-30",
    "openPrice": 672.80,
    "closePrice": 660.30
  },
  {
    "date": "2024-12-31",
    "openPrice": 749.10,
    "closePrice": 760.65
  }
]
const monthlydata = [
  { name: "John", month: "Jan", air: 30, sea: 20 },
  { name: "John", month: "Feb", air: 45, sea: 25 },
  { name: "John", month: "Mar", air: 50, sea: 30 },
  
  { name: "Jane", month: "Jan", air: 40, sea: 15 },
  { name: "Jane", month: "Feb", air: 35, sea: 20 },
  { name: "Jane", month: "Mar", air: 55, sea: 35 },

  { name: "Mike", month: "Jan", air: 25, sea: 30 },
  { name: "Mike", month: "Feb", air: 30, sea: 40 },
  { name: "Mike", month: "Mar", air: 40, sea: 50 },

  { name: "Alice", month: "Jan", air: 20, sea: 25 },
  { name: "Alice", month: "Feb", air: 30, sea: 35 },
  { name: "Alice", month: "Mar", air: 35, sea: 45 },
];




function App(){
  return(
    // <PieChart/>
    <div className='container'>
      {/* <SalesPie/> */}
      {/* <DonutOne/> */}
      {/* <LineChart/> */}
      {/* <LineTwo/> */}
      {/* <WorldMap/> */}
      {/* <Map/> */}
      {/* <VerticalBar data ={data}/> */}
      {/* <StackedBar data={stackeddata}/> */}
      {/* <GroupedBar data={stackeddata}/> */}
      <MonthlyBar data ={monthlydata}/>
      {/* <ChartLine data={timedata}/> */}
      {/* <Stocks data={stocksdata}/> */}
      {/* <KPITrackingTable/> */}
      {/* <BrandPie/> */}
      {/* <AvailabilityStatusPie/> */}
      {/* <HorizontalBarChart/> */}
      {/* <PopulationChart/> */}
      {/* <NamesBar data ={data}/> */}
    </div>
  )
}
export default App