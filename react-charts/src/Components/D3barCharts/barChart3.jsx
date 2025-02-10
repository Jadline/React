import { max, scaleBand, scaleLinear } from "d3";

const MARGIN = { top: 30, right: 30, bottom: 30, left: 30 };
const BAR_PADDING = 0.3;
const width = 700;
const height = 400

const boundsWidth = width - MARGIN.right - MARGIN.left;
const boundsHeight = height - MARGIN.top - MARGIN.bottom;

function NamesBar({data}){
    const groups = data.sort((a, b) => b.value - a.value).map((d) => d.name);

    const yScale = scaleBand()
                .domain(groups)
                .range([0,boundsHeight])
                .padding(BAR_PADDING)
    const xScale = scaleLinear()
                    .domain([0,max(data,(d) => d.value) || 10])
                    .range([0,boundsWidth])
    if(!data) {
        return <pre>Loading...</pre>
    }
    const allShapes = data.map((d,i) => {
        const y = yScale(d.name)
        if(y === undefined) return null 
        return (
            <g key ={i}>
                <rect
                x={0}
                y ={yScale(d.name)}
                width ={xScale(d.value)}
                height ={yScale.bandwidth()}
                opacity ={0.7}
                fill ={"#9d174d"}
                stroke ={"#9d174d"}
                fillOpacity ={0.3}
                strokeWidth={1}
                rx={1}
                />
                <text
                textAnchor ={"end"}
                alignmentBaseline={"middle"}
                fontSize={12}
                x ={xScale(d.value) - 7}
                y ={y + yScale.bandwidth() /2}
                opacity ={xScale(d.value) > 90 ? 1 : 0}
                >
                    {d.value}
                </text>
                <text
                textAnchor ={"start"}
                alignmentBaseline ={"middle"}
                fontSize ={12}
                x = {xScale(0) + 7 }
                y={y + yScale.bandwidth() / 2}
                >
                    {d.name}
                </text>
            </g>
        )
    })
    const grid = xScale.ticks(5).slice(1).map((value,i) => (
        <g key ={i}>
            <line
            x1 = {xScale(value)}
            x2 = {xScale(value)}
            y1 ={0}
            y2={boundsHeight}
            stroke ={"#808080"}
            opacity ={0.2}
            />
            <text
            x ={xScale(value)}
            y ={boundsHeight + 10}
            textAnchor = {"middle"}
            alignmentBaseline={"middle"}
            fontSize ={9}
            stroke ={"#808080"}
            opacity ={0.8}
            >
                {value}
            </text>
        </g>
    ))
    return(
        <svg width={width} height={height}>
            <g 
            width ={boundsWidth}
            height ={boundsHeight}
            transform={`translate(${MARGIN.left},${MARGIN.right})`}
            >
                {grid}
                {allShapes}
            </g>
        </svg>
    )

}
export default NamesBar