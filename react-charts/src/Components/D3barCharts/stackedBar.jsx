import { max, scaleBand, scaleLinear, stack } from "d3";

const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 }; // Increased bottom margin for labels
const BAR_PADDING = 0.3;
const width = 700;
const height = 400;

const boundsWidth = width - MARGIN.right - MARGIN.left;
const boundsHeight = height - MARGIN.top - MARGIN.bottom;

const categories = ["air", "sea"];
const colors = { air: "#1f77b4", sea: "#ff7f0e" };

function StackedBar({ data }) {
  if (!data) return <pre>Loading...</pre>;

  const groups = data.map((d) => d.name);

  const xScale = scaleBand().domain(groups).range([0, boundsWidth]).padding(BAR_PADDING);
  const yScale = scaleLinear()
    .domain([0, max(data, (d) => d.air + d.sea) || 10])
    .range([boundsHeight, 0]);

  const stackedData = stack().keys(categories)(data);

  const allBars = stackedData.map((category, i) =>
    category.map((d, j) => {
      const x = xScale(d.data.name);
      const y = yScale(d[1]);
      const height = yScale(d[0]) - yScale(d[1]);

      if (x === undefined) return null;

      return (
        <g key={`${i}-${j}`}>
          <rect
            x={x}
            y={y}
            width={xScale.bandwidth()}
            height={height}
            fill={colors[category.key]}
            stroke={"white"}
          />
          {height > 15 && (
            <text
              x={x + xScale.bandwidth() / 2}
              y={y + height / 2}
              textAnchor="middle"
              alignmentBaseline="middle"
              fontSize={12}
              fill="white"
            >
              {d[1] - d[0]}
            </text>
          )}
        </g>
      );
    })
  );

  // Grid lines
  const grid = yScale.ticks(5).slice(1).map((value, i) => (
    <g key={i}>
      <line x1={0} x2={boundsWidth} y1={yScale(value)} y2={yScale(value)} stroke={"#808080"} opacity={0.2} />
      <text
        x={-10}
        y={yScale(value)}
        textAnchor="end"
        alignmentBaseline="middle"
        fontSize={9}
        stroke={"#808080"}
        opacity={0.8}
      >
        {value}
      </text>
    </g>
  ));

  // X-axis labels
  const xLabels = groups.map((name, i) => {
    const x = xScale(name);
    if (x === undefined) return null;

    return (
      <text
        key={i}
        x={x + xScale.bandwidth() / 2}
        y={boundsHeight + 20} // Positioning below the bars
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize={12}
        fill="black"
      >
        {name}
      </text>
    );
  });

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
        {grid}
        {allBars}
        {xLabels}
      </g>
    </svg>
  );
}

export default StackedBar;
