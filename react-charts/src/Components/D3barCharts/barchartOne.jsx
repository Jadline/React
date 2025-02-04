import { useEffect,useState } from "react";
import { csv, scaleBand,scaleLinear,max, scaleOrdinal, schemeCategory10} from "d3";
const width = 500;
const height = 960;
const centerX = width  / 2
const centerY = height / 2
const csvUrl = 'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv';
function HorizontalBarChart(){
    const[data,setData] = useState(null)
    useEffect(() => {
        function row (d){
            d.population = +d['2020']
            if(isNaN(d.population))
                d.population = 0
            return d
        }
        async function FetchData(){
            const data = await csv(csvUrl,row)
            // console.log(data.slice(0,10))
            setData(data.slice(0,10))
        }
        FetchData()
    },[])
    
    if(!data) return (
        <pre>Loading...</pre>
    )
    // const yscale = scaleBand()
    //     .domain(data.map((d) => d.Country))
    //     .range([0,height])
    // const xscale = scaleLinear()
    //     .domain(0,max(data, (d) => d.population))
    //     .range([0,width])
    // return(
    //     <svg width ={width} height={height}>
    //        {data?.map((d) => 
    //        <rect 
    //        key ={d.Country}
    //        fill={'#000'}
    //        y={yscale(d.Country)}
    //        width={xscale(d.population)}
    //        height={yscale.bandwidth()}
    //        />)}
    //     </svg>
    // )
    const yScale = scaleBand()
    .domain(data.map((d) => d.Country))
    .range([0, height]);

  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.population)])
    .range([0, width]);
  const colorScale = scaleOrdinal(schemeCategory10)

  return(
    <svg width ={width} height={height}>
        <g transform={`translate(${centerX - 100},${centerY - 350})`}>
            {data.map((d,i) => {
                return(
                    <g key ={d.Country}>
                        <rect
                    y ={yScale(d.Country)}
                    width = {xScale(d.population)}
                    height ={yScale.bandwidth()}        
                />
                {/* <text
                    fontSize ={'16'}
                    textAnchor ={'middle'}
                    alignmentBaseline ={'middle'}
                    x ={xScale(d.population) - 200}
                    y = {yScale(d.Country) + yScale.bandwidth()}
                >
                    {d.Country}
                </text> */}

                </g>
                )

            })}
        </g>

    </svg>
    )
    
};

export default HorizontalBarChart