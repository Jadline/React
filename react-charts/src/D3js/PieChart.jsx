
import {csv,arc,pie} from 'd3'
import { useEffect,useState } from "react";
const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;

const pieArc = arc()
  .innerRadius(0)
  .outerRadius(Math.min(width,height) / 2.5);


function PieChart(){
    
    const [data,setData] = useState(null)
    const csvUrl ='https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv';
    useEffect(() => {
        csv(csvUrl).then(setData)
    },[])
   
    if(!data)
        return <pre>Loading...</pre>
    const colorPie = pie().value(1)
    return (
        <svg width={width} height ={height}>
            <g transform={`translate(${centerX},${centerY})`}>
                {colorPie(data).map(d => (<path fill={d.data['RGB hex value']}  d= {pieArc(d)}/>))}

            </g>

        </svg>
    )
}
        
   
export default PieChart