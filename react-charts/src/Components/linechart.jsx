import { scaleLinear, scaleTime, line, extent,max, timeFormat, timeParse, curveBasis } from "d3";

const MARGIN = { top: 50, right: 30, bottom: 50, left: 60 };
const width = 700;
const height = 400;

const boundsWidth = width - MARGIN.left - MARGIN.right;
const boundsHeight = height - MARGIN.top - MARGIN.bottom;

const colors = { air: "#1f77b4", sea: "#ff7f0e" };

function ChartLine({ data }) {
  if (!data || data.length === 0) return <pre>Loading...</pre>;

  // Parse date using d3.timeParse
  const parseDate = timeParse("%Y-%m-%d");
  const parsedData = data.map((d) => ({
    ...d,
    date: parseDate(d.date),
  }));

  // X Scale (Time)
  const xScale = scaleTime()
    .domain(extent(parsedData, (d) => d.date))
    .range([0, boundsWidth]);

  // Y Scale (Delivery Time)
  const yScale = scaleLinear()
    .domain([0,max(parsedData, (d) => Math.max(d.air, d.sea))]).nice()
    .range([boundsHeight, 0]);

  // Line generators with smooth curves
  const lineAir = line()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.air))
    .curve(curveBasis);

  const lineSea = line()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.sea))
    .curve(curveBasis);

  // Grid lines
  const grid = yScale.ticks(5).map((value, i) => (
    <g key={i}>
      <line x1={0} x2={boundsWidth} y1={yScale(value)} y2={yScale(value)} stroke="#808080" opacity={0.4} />
      <text x={-10} y={yScale(value)} textAnchor="end" alignmentBaseline="middle" fontSize={10} fill="#808080">
        {value}
      </text>
    </g>
  ));

  // X-axis labels formatted as "Jan 2024", "Feb 2024"
  const xLabels = xScale.ticks(5).map((date, i) => (
    <text key={i} x={xScale(date)} y={boundsHeight + 25} textAnchor="middle" fontSize={10} fill="black">
      {timeFormat("%b %Y")(date)}
    </text>
  ));

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
        {grid}
        <path d={lineAir(parsedData)} fill="none" stroke={colors.air} strokeWidth={2} />
        <path d={lineSea(parsedData)} fill="none" stroke={colors.sea} strokeWidth={2} />
        {xLabels}
      </g>
    </svg>
  );
}

export default ChartLine;
