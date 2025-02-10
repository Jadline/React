import {useEffect,useState} from 'react'
import { csv ,scaleLinear,scaleBand,max, schemeCategory10, scaleOrdinal, scaleLog} from 'd3';

const width =500;
const height = 960
const centerX = width / 2
const centerY = height / 2;
const margin = {top : 20,bottom : 20,right : 20,left : 20}
const csvUrl = 'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv';
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.right - margin.left;
function PopulationChart(){
    const[data,setData] = useState(null)
    useEffect(() => {
        function row(d){
            d.population = +d['2020']
            return d
        }
        async function fetchData(){
            const data = await csv(csvUrl,row)
            console.log(data.slice(0,10))
            setData(data.slice(0,18))
        }
        fetchData()
    },[])
    if(!data) return <pre>Loading ...</pre>
    const colorScale = scaleOrdinal(schemeCategory10)
    const CountryNames = data?.sort((a ,b) => b.population - a.population).map((d) => d.Country)
    const xScale = scaleLinear()
                   .domain([0,max(data,(d) => d.population) || 10])
                   .range([0,innerWidth])
    const yScale = scaleBand()
                   .domain(CountryNames)
                   .range([0, innerHeight])
                   .padding(0.1)
    const CountryBars = data?.map((d,i) => {
        const y = yScale(d.Country)
        if(y === undefined) return null

        return (
            <g key={i}>
                <rect
                x = {0}
                y = {yScale(d.Country)}
                width ={xScale(d.population)}
                height = {yScale.bandwidth()}
                fill ={colorScale(i)}
                rx={5}
                />
                <text
                textAnchor ={"start"}
                alignmentBaseline ={"middle"}
                fontSize ={12}
                y = {y + yScale.bandwidth() / 2}
                x = {xScale(0) + 7}
                fill ={"#fff"}
                >
                    {d.Country}
                </text>
                <text
                fontSize ={12}
                textAnchor ={"middle"}
                alignmentBaseline ={"end"}
                x ={xScale(d.population) - 30}
                y = {y + yScale.bandwidth() / 2 }
                opacity ={xScale(d.population) < 120 ? 0 : 1}
                fill={"#fff"}
                
                >
                    {d.population}
                </text>
            </g>
        )
    })
    const grid = xScale.ticks(5).slice(1).map((value,i) => (
        <g key={i}>
            <line
            x1 ={xScale(value)}
            x2 ={xScale(value)}
            y1 = {0}
            y2 = {innerHeight}
            stroke={"#060101"}
            strokeWidth ={1}
            opacity={0.6}
            />
            <text
            fontSize ={9}
            x = {xScale(value)}
            y ={innerHeight + 3}
            textAnchor={"middle"}
            alignmentBaseline ={"middle"}
            >
                {value}
            </text>
        </g>
    ))
    
    return(
        <svg width={width} height={height}>
            <g transform={`translate(${margin.top},${margin.left})`}>
                {grid}
                {CountryBars}
            </g>
        </svg>
    )
    





}
export default PopulationChart