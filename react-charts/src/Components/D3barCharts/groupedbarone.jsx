import { scaleBand, scaleLinear,max } from "d3";

const width =  700;
const height = 400;
const Margin = {top : 30, bottom : 30, right : 50, left :50}

const boundsWidth = width - Margin.right - Margin.left
const boundsHeight = height - Margin.top - Margin.bottom
const categories = ["air", "sea"];
const colors = { air: "#1f77b4", sea: "#ff7f0e" };
const months = ['Jan','Feb','Mar']
const BAR_PADDING = 0.3;
function MonthlyBar({data}){
    if(!data) return <pre>Loading....</pre>
    const groups = []
    data.forEach((d) => {
        if(groups.includes(d.name)) return;
        groups.push(d.name)
    })
    //make the main xscale
    const xScale = scaleBand()
                   .domain(groups)
                   .range([0,boundsWidth])
                   .padding(BAR_PADDING)
    //SUBSCALE
    const xScaleMonths = scaleBand()
                     .domain(months)
                     .range([0,xScale.bandwidth()]).padding(0.2)
    const xScaleCategories = scaleBand()
                            .domain(categories)
                            .range([0,xScaleMonths.bandwidth()]).padding(0.05)
    //yscale 
    const yScale = scaleLinear()
                  .domain([0,max(data,(d) => Math.max(d.air,d.sea))])
                  .range([boundsHeight,0])
    const allshapes = data.flatMap((d,i) => 
                     months.flatMap((month,j) =>
                    categories.map((category,k)=> {
                        const x = xScale(d.name) + xScaleMonths(month) + xScaleCategories(category)
                        const y = yScale(d[category])
                        const barHeight = boundsHeight - y

                        if(x === undefined) return null
                        return(
                            <g key ={`${i}-${j}-${k}`}>
                                <rect
                                x = {x}
                                y ={y}
                                 width ={xScaleCategories.bandwidth()}
                                 height = {barHeight}
                                 fill = {colors[category]}
                                 stroke ={'#fff'}
                                />
                                {barHeight > 15 && (
                                    <text
                                    textAnchor={'middle'}
                                    alignmentBaseline ={'middle'}
                                    x = {x + xScaleCategories.bandwidth() /2}
                                    y ={y - 3 }
                                    fontSize ={9}
                                    fill ={'#000'}
                                    >
                                        {d[category]}
                                    </text>
                                )}
                            </g>
                        )
                    }) 
                    )
                )
    const yGrids = yScale.ticks().map((value,i) => (
        <g key ={i}>
            <line
            x1={0}
            x2 ={boundsWidth}
            y1 ={yScale(value)}
            y2 ={yScale(value)}
            stroke ={'#000'}
            opacity ={0.4}
            />
        <text
        x ={-10}
        y ={yScale(value)}
        textAnchor ={'end'}
        alignmentBaseline ={'middle'}
        >
            {value}
        </text>
        </g>
    ))
    const xlabels = groups.map((name,i) => {
        const x = xScale(name)
        if(x === undefined) return null 
        return (
            <text key={i}
            x ={xScale(name) + xScale.bandwidth() /2 }
            y ={boundsHeight + 25}
            fill ={'#000'}
            textAnchor ={'middle'}
            alignmentBaseline ={'middle'}
            >
                {name}
    
            </text>
        )
    })
                        
    
    return(
        <svg width={width} height={height}>
      <g transform={`translate(${Margin.left},${Margin.top})`}>
        {yGrids}
        {allshapes}
        {xlabels}
      </g>
    </svg>
    )
}
export default MonthlyBar