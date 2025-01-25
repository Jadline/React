import {useRef,useEffect} from 'react'
import * as d3 from 'd3';

const data = [
    { x: 1, y: 50 },
    { x: 2, y: 80 },
    { x: 3, y: 65 },
    { x: 4, y: 90 },
    { x: 5, y: 100 }
];


function LineChart({data}) {
    const svgRef = useRef()

    useEffect(() => {
        const svg = d3.select(svgRef.current)

        const Xscale = d3.scaleLinear().
                domain([0,d3.max(data,d => d.x)]).
                range([0,500])
        const Yscale = d3.scaleLinear().
                domain([0,d3.max(data,d => d.y)]).
                range([300,0])
        const line = d3.line().
            x(d => Xscale(d.x)).
            y(d => Yscale(d.y))

        //step 3: creating the X and Y axis 
        const xAxis = d3.axisBottom(Xscale);
        const yAxis = d3.axisLeft(Yscale);
    },[data])
    return(

        <svg>
        ref={svgRef} width ={500} height={300}
        </svg>
    )
}
export default LineChart