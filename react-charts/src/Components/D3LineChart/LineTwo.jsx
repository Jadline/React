import { csv, max, scaleLinear, scaleTime, extent, line } from "d3";
import { useState, useEffect } from "react";

const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const csvUrl = 'https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv';

function LineTwo() {
    const [data, setData] = useState(null);

    useEffect(() => {
        function row(d) {
            d.temperature = +d.temperature;
            d.timestamp = new Date(d.timestamp);
            return d;
        }

        async function fetchData() {
            const linedata = await csv(csvUrl, row);
            setData(linedata);
        }
        fetchData();
    }, []);

    if (!data) return <div>Loading...</div>;

    const xScale = scaleTime()
        .domain(extent(data, (d) => d.timestamp))
        .range([0, innerWidth]);

    const yScale = scaleLinear()
        .domain([0, max(data, (d) => d.temperature)])
        .range([innerHeight,0]); // Flip the range

    const xAxisGrid = xScale.ticks(5).map((value, i) => (
        <g key={i} transform={`translate(${xScale(value)},0)`}>
            <line x1={0} x2={0} y1={0} y2={innerHeight} stroke={"#000"} opacity={0.6} />
            <text textAnchor="middle" fontSize={12} y={innerHeight + 20}>
            {value.toLocaleDateString("en-US", { weekday: "short" })}
            </text>
        </g>
    ));

    const yAxisGrid = yScale.ticks().map((value, i) => (
        <g key={i} transform={`translate(0,${yScale(value)})`}>
            <line x1={0} x2={innerWidth} y1={0} y2={0} stroke={"#000"} opacity={0.5} />
            <text textAnchor="end" x={-7} y={5}>
                {value}
            </text>
        </g>
    ));

    const lineGenerator = line()
        .x((d) => xScale(d.timestamp))
        .y((d) => yScale(d.temperature));

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left},${margin.top})`}>
                {xAxisGrid}
                {yAxisGrid}
                <path d={lineGenerator(data)} stroke={"black"} fill="none" strokeWidth={2} />
                {/* {data.map((d, i) => (
                    <circle
                        key={i}
                        cx={xScale(d.timestamp)}
                        cy={yScale(d.temperature)}
                        r={4}
                        fill={"steelblue"}
                    />
                ))} */}
            </g>
        </svg>
    );
}

export default LineTwo;
