// import React, { useEffect, useRef } from "react";
// import * as d3 from "d3";

// const WorldMap = () => {
//   const svgRef = useRef();
//   const tooltipRef = useRef();

//   useEffect(() => {
//     const width = 800, height = 500;

//     const svg = d3.select(svgRef.current)
//       .attr("width", width)
//       .attr("height", height);

//     const tooltip = d3.select(tooltipRef.current)
//       .style("position", "absolute")
//       .style("background", "white")
//       .style("padding", "5px")
//       .style("border", "1px solid black")
//       .style("display", "none");

//     const projection = d3.geoNaturalEarth1()
//       .scale(200)
//       .translate([width / 2, height / 2]);

//     const path = d3.geoPath().projection(projection);

//     // Define country colors
//     const countries = {
//       "China": "red",
//       "South Africa": "green",
//       "Netherlands": "blue",
//       "Turkey": "purple",
//       "United Arab Emirates": "orange",
//       "United Kingdom": "yellow",
//       "Italy": "pink"
//     };

//     // UK regions to be grouped under "United Kingdom"
//     const ukRegions = ["England", "Scotland", "Wales", "Northern Ireland"];

//     const shippingTimes = {
//       "China": { air: "5 days", sea: "30 days" },
//       "South Africa": { air: "6 days", sea: "25 days" },
//       "Netherlands": { air: "4 days", sea: "20 days" },
//       "Turkey": { air: "5 days", sea: "22 days" },
//       "United Arab Emirates": { air: "3 days", sea: "18 days" },
//       "United Kingdom": { air: "4 days", sea: "21 days" },
//       "Italy": { air: "4 days", sea: "23 days" }
//     };

//     // Fetch world map data
//     fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
//       .then(response => response.json())
//       .then(data => {
//         svg.append("g")
//           .selectAll("path")
//           .data(data.features)
//           .enter().append("path")
//           .attr("class", "country")
//           .attr("d", path)
//           .attr("fill", d => {
//             const name = d.properties.name;
//             return ukRegions.includes(name) ? "yellow" : (countries[name] || "#ccc");
//           })
//           .attr("stroke", "#fff")
//           .on("mouseover", function (event, d) {
//             const name = d.properties.name;
//             let displayName = name;
//             let shippingInfo = shippingTimes[name];

//             // Group UK regions under "United Kingdom"
//             if (ukRegions.includes(name)) {
//               displayName = "United Kingdom";
//               shippingInfo = shippingTimes["United Kingdom"];
//             }

//             if (shippingInfo) {
//               d3.select(this).attr("fill", "gray");

//               tooltip.style("display", "block")
//                 .html(`<b>${displayName}</b><br>Air: ${shippingInfo.air}<br>Sea: ${shippingInfo.sea}`)
//                 .style("left", `${event.pageX + 10}px`)
//                 .style("top", `${event.pageY - 10}px`);
//             }
//           })
//           .on("mouseout", function (event, d) {
//             const name = d.properties.name;
//             if (ukRegions.includes(name)) {
//               d3.select(this).attr("fill", "red");
//             } else if (countries[name]) {
//               d3.select(this).attr("fill", countries[name]);
//             }
//             tooltip.style("display", "none");
//           });
//       })
//       .catch(error => console.error("Error loading map data:", error));

//   }, []);

//   return (
//     <div>
//       <svg ref={svgRef}></svg>
//       <div ref={tooltipRef}></div>
//     </div>
//   );
// };

// export default WorldMap;
import React, { useEffect, useState } from "react";
import * as d3 from "d3";

const WorldMap = () => {
  const [mapData, setMapData] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, name: "", air: "", sea: "", x: 0, y: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson");
      const data = await response.json();
      setMapData(data.features);
    };
    
    fetchData();
  }, []);

  const width = 800, height = 500;
  const projection = d3.geoNaturalEarth1().scale(200).translate([width / 2, height / 2]);
  const pathGenerator = d3.geoPath().projection(projection);

  const countries = {
    "China": "red",
    "South Africa": "green",
    "Netherlands": "blue",
    "Turkey": "purple",
    "United Arab Emirates": "orange",
    "United Kingdom": "yellow",
    "Italy": "pink"
  };

  const ukRegions = ["England", "Scotland", "Wales", "Northern Ireland"];

  const shippingTimes = {
    "United Kingdom": { air: "3-5 days", sea: "20-25 days" },
    "China": { air: "5-7 days", sea: "30-40 days" },
    "South Africa": { air: "4-6 days", sea: "25-30 days" },
    "Netherlands": { air: "2-4 days", sea: "15-20 days" },
    "Turkey": { air: "3-5 days", sea: "18-22 days" },
    "United Arab Emirates": { air: "3-6 days", sea: "20-30 days" },
    "Italy": { air: "2-4 days", sea: "15-20 days" }
  };

  return (
    <div style={{ position: "relative" }}>
      <svg width={width} height={height}>
        <g>
          {mapData && mapData.map((feature, index) => {
            let countryName = feature.properties.name;
            let displayName = countryName;
            let shippingInfo = shippingTimes[countryName];

            if (ukRegions.includes(countryName)) {
              displayName = "United Kingdom";
              shippingInfo = shippingTimes["United Kingdom"];
            }

            const fillColor = ukRegions.includes(countryName) ? "yellow" : (countries[countryName] || "#ccc");

            return (
              <path
                key={index}
                d={pathGenerator(feature)}
                fill={fillColor}
                stroke="#fff"
                className="country"
                onMouseEnter={(e) => {
                  if (shippingInfo) {
                    setTooltip({ 
                      visible: true, 
                      name: displayName, 
                      air: shippingInfo.air, 
                      sea: shippingInfo.sea, 
                      x: e.pageX, 
                      y: e.pageY 
                    });
                  }
                }}
                onMouseMove={(e) => {
                  setTooltip((prev) => ({ ...prev, x: e.pageX, y: e.pageY }));
                }}
                onMouseLeave={() => setTooltip({ visible: false, name: "", air: "", sea: "", x: 0, y: 0 })}
              />
            );
          })}
        </g>
      </svg>

      {/* Tooltip */}
      {tooltip.visible && (
        <div 
          style={{
            position: "absolute",
            left: tooltip.x + 10,
            top: tooltip.y - 10,
            background: "white",
            padding: "8px",
            border: "1px solid black",
            borderRadius: "5px",
            fontSize: "12px",
            pointerEvents: "none"
          }}
        >
          <b>{tooltip.name}</b><br />
          Air: {tooltip.air}<br />
          Sea: {tooltip.sea}
        </div>
      )}
    </div>
  );
};

export default WorldMap;
