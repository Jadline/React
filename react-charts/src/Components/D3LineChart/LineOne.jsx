import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, scaleLinear, scaleTime, extent, timeFormat, line, curveNatural } from 'd3';

const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;

const csvUrl =
  'https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv';

// Custom Hook for Fetching Data
const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = d => {
      d.temperature = +d.temperature;
      d.timestamp = new Date(d.timestamp);
      return d;
    };
    csv(csvUrl, row).then(setData);
  }, []);

  return data;
};

// X-Axis Component
const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset = 3 }) =>
  xScale.ticks().map(tickValue => (
    <g key={tickValue} className="tick" transform={`translate(${xScale(tickValue)},0)`}>
      <line y2={innerHeight} stroke="black" />
      <text y={innerHeight + tickOffset} dy=".71em" style={{ textAnchor: 'middle' }}>
        {tickFormat(tickValue)}
      </text>
    </g>
  ));

// Y-Axis Component
const AxisLeft = ({ yScale, innerWidth, tickOffset = 3 }) =>
  yScale.ticks().map(tickValue => (
    <g key={tickValue} className="tick" transform={`translate(0,${yScale(tickValue)})`}>
      <line x2={innerWidth} stroke="black" />
      <text x={-tickOffset} dy=".32em" style={{ textAnchor: 'end' }}>
        {tickValue}
      </text>
    </g>
  ));

// Marks Component
const Marks = ({ data, xScale, yScale, xValue, yValue, tooltipFormat }) => (
  <g className="marks">
    <path
      fill="none"
      stroke="black"
      strokeWidth={2}
      d={line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
        .curve(curveNatural)(data)}
    />
    {data.map(d => (
      <circle key={d.timestamp} cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={4} fill="steelblue">
        <title>{tooltipFormat(xValue(d))}</title>
      </circle>
    ))}
  </g>
);

// Main App Component
const LineChart = () => {
  const data = useData();

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xValue = d => d.timestamp;
  const xAxisLabel = 'Time';

  const yValue = d => d.temperature;
  const yAxisLabel = 'Temperature';

  const xAxisTickFormat = timeFormat('%a');

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight} tickFormat={xAxisTickFormat} tickOffset={7} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>

        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={7} />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}
        >
          {yAxisLabel}
        </text>

        <Marks data={data} xScale={xScale} yScale={yScale} xValue={xValue} yValue={yValue} tooltipFormat={xAxisTickFormat} />
      </g>
    </svg>
  );
};
export default LineChart

