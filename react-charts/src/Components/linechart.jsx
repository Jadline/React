import { useEffect, useRef } from "react";
import * as d3 from "d3";

const data = [
  { date: "2024-01-01", air: 5, sea: 10 },
  { date: "2024-02-01", air: 6, sea: 9 },
  { date: "2024-03-01", air: 7, sea: 12 },
  { date: "2024-04-01", air: 5.5, sea: 8 },
  { date: "2024-05-01", air: 4, sea: 6 },
];

function ChartLinw() {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 600;
    const height = 400;
    const margin = { top: 30, right: 50, bottom: 40, left: 50 };

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("overflow", "visible");

    const parseDate = d3.timeParse("%Y-%m-%d");
    data.forEach(d => (d.date = parseDate(d.date)));

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => Math.max(d.air, d.sea))])
      .range([height - margin.bottom, margin.top]);

    const lineGenerator = d3
      .line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.air))
      .curve(d3.curveBasis);

    const lineGeneratorSea = d3
      .line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.sea))
      .curve(d3.curveBasis);

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#9d174d")
      .attr("stroke-width", 2)
      .attr("d", lineGenerator);

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#0077b6")
      .attr("stroke-width", 2)
      .attr("d", lineGeneratorSea);

    const xAxis = d3.axisBottom(xScale).ticks(5).tickFormat(d3.timeFormat("%b %Y"));
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis);
  }, []);

  return <svg ref={svgRef}></svg>;
}

export default ChartLinw;
