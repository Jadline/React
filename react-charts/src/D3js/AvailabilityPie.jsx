import { useEffect,useState } from "react"
import {pie,arc,scaleOrdinal,schemeCategory10} from 'd3'
const productsUrl = 'https://dummyjson.com/products'
const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;

function AvailabilityStatusPie(){
    const [data,setData] = useState()
    const status = []
    console.log(status)
    data?.forEach((product) =>{
        if(status.includes(product.availabilityStatus)) return
        status.push(product.availabilityStatus)
    } )
    const statusdata = status?.map((productstatus) => {
        return{
            productstatus,
            count : data?.filter((product) => product.availabilityStatus === productstatus).length       }
    })
    console.log(statusdata)
    const totalCount = statusdata.reduce((acc,product) => acc + product.count,0)
    useEffect(() => {
        async function fetchAvailability(){
            const res = await fetch(productsUrl)
            if(!res.ok) throw new Error('There was an error fetching data')
            const data = await res.json()
            setData(data.products)

        }
        fetchAvailability()
    },[])
    const availabilityArc = arc()
    .innerRadius(0)
    .outerRadius(Math.min(width,height)/2)
    const colorScale = scaleOrdinal(schemeCategory10)
    const availabilityPie = pie().value(d => d.count)
    if(!data) return(<pre>Loading ....</pre>)
    return(
        <svg width ={width} height={height}>
            <g transform ={`translate(${centerX},${centerY})`}>
                {availabilityPie(statusdata).map((d,i) => {
                    const percentage = ((d.data.count / totalCount)) * 100
                    const[x,y] = availabilityArc.centroid(d)
                    return (
                        <g key={i}>
                        <path 
                          d ={availabilityArc(d)}
                          fill={colorScale(i + 2)}
                        />
                        <text
                            fill = {'white'}
                            fontSize = {'16'}
                            textAnchor = {'middle'}
                            alignmentBaseline = {'middle'}
                            transform = {`translate(${x},${y})`}
                        >
                            {d.data.productstatus}
                        </text>
                        <text
                        fill ={'white'}
                        fontSize ={'14'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        transform ={`translate(${x},${y + 20})`}
                        >
                            {percentage} %
                        </text>
                    </g>
                    )
                })}
            </g>
        </svg>
    )

}
export default AvailabilityStatusPie