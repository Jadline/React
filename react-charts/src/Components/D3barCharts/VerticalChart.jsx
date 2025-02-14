import { max, scaleBand, scaleLinear } from "d3";

const MARGIN = { top: 30, right: 30, bottom: 30, left: 50 }; // Adjust left margin for labels
const BAR_PADDING = 0.3;
const width = 700;
const height = 400;

const boundsWidth = width - MARGIN.right - MARGIN.left;
const boundsHeight = height - MARGIN.top - MARGIN.bottom;

function VerticalBar({ data }) {
  if (!data) {
    return <pre>Loading...</pre>;
  }

  const groups = data.map((d) => d.name); // Names as categories

  // X-axis for categories (bars)
  const xScale = scaleBand()
    .domain(groups)
    .range([0, boundsWidth])
    .padding(BAR_PADDING);

  // Y-axis for values (height of bars)
  const yScale = scaleLinear()
    .domain([0, max(data, (d) => d.value) || 10])
    .range([boundsHeight, 0]); // Flipped for SVG coordinates

  const allShapes = data.map((d, i) => {
    const x = xScale(d.name);
    if (x === undefined) return null;
    return (
      <g key={i}>
        {/* Bar */}
        <rect
          x={x}
          y={yScale(d.value)} // Use yScale for height
          width={xScale.bandwidth()}
          height={boundsHeight - yScale(d.value)} // Bar height
          opacity={0.7}
          fill={"#9d174d"}
          stroke={"#9d174d"}
          fillOpacity={0.3}
          strokeWidth={1}
          rx={1}
        />
        {/* Value Label */}
        <text
          textAnchor={"middle"}
          alignmentBaseline={"middle"}
          fontSize={12}
          x={x + xScale.bandwidth() / 2} // Center on the bar
          y={yScale(d.value) - 5} // Slightly above the bar
          opacity={yScale(d.value) < boundsHeight - 20 ? 1 : 0}
        >
          {d.value}
        </text>
        {/* Category Name Label */}
        <text
          textAnchor={"middle"}
          alignmentBaseline={"hanging"}
          fontSize={12}
          x={x + xScale.bandwidth() / 2} // Center on the bar
          y={boundsHeight + 10} // Below bars
        >
          {d.name}
        </text>
      </g>
    );
  });

  const grid = yScale.ticks(5).slice(1).map((value, i) => (
    <g key={i}>
      <line
        x1={0}
        x2={boundsWidth}
        y1={yScale(value)}
        y2={yScale(value)}
        stroke={"#808080"}
        opacity={0.2}
      />
      <text
        x={-10}
        y={yScale(value)}
        textAnchor={"end"}
        alignmentBaseline={"middle"}
        fontSize={9}
        stroke={"#808080"}
        opacity={0.8}
      >
        {value}
      </text>
    </g>
  ));

  return (
    <svg width={width} height={height}>
      <g
        width={boundsWidth}
        height={boundsHeight}
        transform={`translate(${MARGIN.left},${MARGIN.top})`}
      >
        {grid}
        {allShapes}
      </g>
    </svg>
  );
}

export default VerticalBar;
