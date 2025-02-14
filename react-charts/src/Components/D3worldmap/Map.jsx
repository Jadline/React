import { geoNaturalEarth1, geoPath } from "d3"
import { useEffect, useState } from "react"


const width = 800
const height = 500
const centerX = width / 2
const centerY = height / 2
const mapURL = 'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'
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
function Map(){
    const[mapdata,setMapData] = useState(null)
    const[tooltip,setTooltip] = useState({
        visible : false,
        name: "",
        Air : '',
        Sea : '',
        x : 0,
        y : 0
    })

    useEffect(() => {
        async function fetchdata(){
            const res = await fetch(mapURL)
            if(!res.ok) throw new Error('There was an error fetching the data')
            const data = await res.json()
            console.log(data)
            setMapData(data.features)

        }
        fetchdata()
    },[])
    const projection = geoNaturalEarth1().scale(200).translate([centerX,centerY])
    const pathGenerator = geoPath().projection(projection)
    return(
        <div style={{"position" : "relative"}}>
            <svg width={width} height={height}>
                   <g>
                    {mapdata && mapdata.map((feature,index) => {
                        let countryName = feature.properties.name
                        let displayName = countryName
                        let shippingInfo = shippingTimes[countryName]
                        
                        if(ukRegions.includes(countryName)){
                            displayName = 'United Kingdom'
                            shippingInfo = shippingTimes['United Kingdom']
                        }

                        const fillColor = (ukRegions.includes(countryName) ? 'yellow' : countries[countryName] || '#fff')
                        return(
                            <path 
                            key ={index}
                            d = {pathGenerator(feature)}
                            fill ={fillColor}
                            stroke ={'gray'}
                            onMouseEnter={(e) => {
                               if(shippingInfo){
                                setTooltip({
                                    visible : true,
                                    name : displayName,
                                    Air : shippingInfo.air,
                                    Sea : shippingInfo.sea,
                                    x : e.pageX,
                                    y : e.pageY

                                })
                               }
                            }}
                            onMouseMove={(e) => {
                                setTooltip((prev) => ({...prev,x : e.pageX,y : e.pageY}))
                            }}
                            onMouseLeave={() => {
                                setTooltip({visible : false,name : '',x : 0,y : 0})
                            }}
                            />
                        )
                    })}
                   
                   </g>
            </svg>
            {tooltip.visible && (
                <div style={{
                    position : "absolute",
                    left : tooltip.x + 10,
                    top : tooltip.y - 10,
                    backgroundColor : '#fff',
                    padding : '8px',
                    border : '2px solid #000',
                    borderRadius : '5px',
                    fontSize : '12px'
                }}>
                    <b>{tooltip.name}</b><br/>
                    Air : {tooltip.Air} <br/>
                    Sea :{tooltip.Sea}
                </div>
            )}
        </div>
    )
}
export default Map