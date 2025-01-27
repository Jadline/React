import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './lineChart.css';

function LineChart({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    console.log(data);
    const svg = d3.select(svgRef.current);

    const width = 500;
    const height = 300;

    const Xscale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.x)])
      .range([0, 500]);

    const Yscale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y)])
      .range([300, 0]);

    const line = d3.line()
      .x(d => Xscale(d.x))
      .y(d => Yscale(d.y));

    // Create the X and Y axis
    const xAxis = d3.axisBottom(Xscale)
      .tickSize(-height)  // Set tick size
      .tickFormat('');    // Remove tick labels

    const yAxis = d3.axisLeft(Yscale)
      .tickSize(-width)   // Set tick size
      .tickFormat('');    // Remove tick labels

    // Append X axis
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    // Append Y axis
    svg.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);

    // Append the line
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);

    // X axis label
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + 40)
      .style('font-size', '16px')
      .style('fill','#000')
      .text('Months');
    

    // Y axis label
    svg.append('text')
      .attr('x', -height / 2)
      .attr('y', -50)
      .attr('transform', 'rotate(-90)')
      .style('font-size', '16px')
      .style('fill','#000')
      .text('Temperatures');

    // Apply styling to the grid lines (Y axis)
    svg.selectAll('.y-axis .tick line')
      .attr('stroke', '#000')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '2,2')
      .on('mouseover', function () {
        d3.select(this)
          .attr('stroke', 'steelblue')
          .attr('stroke-width', 2);
      })
      .on('mouseout', function () {
        d3.select(this)
          .attr('stroke', '#000')
          .attr('stroke-width', 1);
      });

    // Apply styling to the grid lines (X axis)
    svg.selectAll('.x-axis .tick line')
      .attr('stroke', '#000')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '2,2')
      .on('mouseover', function () {
        d3.select(this)
          .attr('stroke', 'steelblue')
          .attr('stroke-width', 2);
      })
      .on('mouseout', function () {
        d3.select(this)
          .attr('stroke', '#000')
          .attr('stroke-width', 1);
      });
  }, [data]);

  return (
    <svg ref={svgRef} width={500} height={300}></svg>
  );
}

export default LineChart;
