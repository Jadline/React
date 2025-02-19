import { scaleTime, timeParse,extent, max,scaleLinear, line, curveBasis, timeFormat } from 'd3';
import {useEffect,useState} from 'react'
const API_KEY = 'XLOFSW5S01CH8YQT'
const stocks_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=${API_KEY}`
// const width = 700;
// const height = 400;
// const centerX = width / 2
// const centerY = height /2;
const MARGIN = { top: 50, right: 30, bottom: 50, left: 60 };
const width = 700;
const height = 400;

const boundsWidth = width - MARGIN.left - MARGIN.right;
const boundsHeight = height - MARGIN.top - MARGIN.bottom;

const colors = { openPrice: "#124971", closePrice: "#ff7f0e" };
function Stocks ({data}){
    if(!data) return <pre>Loading....</pre>
    // const [stockdata,setStockdata] = useState(null)

    // useEffect(() => {
    //     async function fetchdata() {
    //       try {
    //         const res = await fetch(stocks_URL);
    //         if (!res.ok) throw new Error('There was an error fetching data');
    //         const data = await res.json();
    //         console.log(data); // Log the fetched data to ensure it's correct
    //         setStockdata(data['Monthly Time Series']);
    //       } catch (error) {
    //         console.error(error); // Log any errors that might occur during fetch
    //       }
    //     }
    //     fetchdata();
    //   }, []);
    // console.log(stockdata)
    
    
//     const stockprices = stockdata && Object.keys(stockdata).map((date) => (
//         {
//             date,
//             openPrice : parseFloat(stockdata[date]['1. open']),
//             closePrice : parseFloat(stockdata[date]['4. close'])
//         }
//     )).filter((d) => {
//         const currentdate = new Date(d.date)
//         const year = currentdate.getFullYear()
//         const month = currentdate.getMonth()

//         return year === 2024 && month >= 6 && month <= 12
//     })
    
//     // console.log(stockprices)
   
//    const parsedData = stockprices?.map((d) => ({
//     ...d,
//     date: parseDate(d.date)  || new Date(d.date)
//   }));
  
//   console.log(parsedData);
const parseDate = timeParse('%Y-%m-%d')
const parseData = data.map((d) => (
    {
        ...d,
        date : parseDate(d.date) || new Date(d.date)
    }
))
const xScale = scaleTime()
                .domain(extent(parseData,(d) => d.date))
                .range([0,boundsWidth])
const yScale = scaleLinear()
                .domain([0, max(parseData, (d) => Math.max(d.openPrice, d.closePrice))])
                .nice()
                .range([boundsHeight, 0]);
const closePriceLine = line()
.x((d) => xScale(d.date))
.y((d) => yScale(d.closePrice))
.curve(curveBasis)
const openPriceLine = line()
.x((d) => xScale(d.date))
.y((d) => yScale(d.openPrice))
.curve(curveBasis)

const gridLines = yScale.ticks().map((value,index) => (
    <g key={index}>
        <line
        x1 ={0}
        x2 ={boundsWidth}
        y1 ={yScale(value)}
        y2 ={yScale(value)}
        stroke={'gray'
        }
        opacity ={0.2}
        strokeWidth ={2}
        />
        <text
        x ={-35}
        y ={yScale(value)}
        fill={'#000'}
        >
            {value}
        </text>
    </g>
))
const xAxis = xScale.ticks().map((date,i) => (
    <text key ={i} x={xScale(date)} y ={boundsHeight + 20} textAnchor={"middle"} >
        {timeFormat('%b %Y')(date)}
    </text>
))
    return (
        <svg width ={width} height={height}>
            <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
                    {gridLines}
                    <path d={closePriceLine(parseData)} fill={'none'} stroke={colors.closePrice}/>
                    <path d ={openPriceLine(parseData)} fill={'none'} stroke={colors.openPrice}/>
                    {xAxis}
            </g>

        </svg>
    )
}
export default Stocks