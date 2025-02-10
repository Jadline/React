import {useState,useEffect} from 'react'
import {arc,pie,scaleOrdinal,schemeCategory10} from 'd3'
const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;
const productsUrl = 'https://dummyjson.com/products'


function DonutOne(){
    const [data,setData] = useState(null)
    useEffect(() => {
        async function fetchData(){
            const res = await fetch(productsUrl)
            if(!res.ok) throw new Error('There was an error fetching the data')
            const salesdata = await res.json()
            setData(salesdata.products)

        }
        fetchData()
    },[])
    const categories = []
    data?.forEach((product) => {
        if(categories.includes(product.category)) return
        categories.push(product.category)
    })
    const salesCategories = categories.map((category) => {
        return {
            category ,
            count : data.filter((product) => product.category === category).length
        }
    })
    const SalesArc = arc()
                    .innerRadius(100)
                    .outerRadius(Math.min(height,width) / 2.5 )
    const colorScale = scaleOrdinal(schemeCategory10)
    const SalesPie = pie().value(d => d.count)
    if(!data) return <pre>Loading...</pre>
    return(
        <svg width={width} height={height}>
            <g transform={`translate(${centerX}, ${centerY})`}>
                {SalesPie(salesCategories).map((d, i) => (
                    <path
                        key={i}
                        d={SalesArc(d)}
                        fill={colorScale(i)}
                    />
                ))}
            </g>
        </svg>
    )
}
export default DonutOne