
import {useState,useEffect} from 'react'
import {arc,pie,scaleOrdinal,schemeCategory10} from 'd3'
const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;
const productsUrl = 'https://dummyjson.com/products'


function  SalesPie(){
    const [data,setData] = useState(null)
    const categories = []
    data?.forEach((product) => {
        if(categories.includes(product.category)) return;
        categories.push(product.category)
    })
    console.log(categories)
    const categoryData = categories.map((category) => {
        return{
            category,
            count : data?.filter((product) => product.category === category).length
        }
    })
    console.log(categoryData)
    const totalCount = categoryData.reduce((acc,category) => acc + category.count,0 )
    useEffect(() => {
        async function FetchData(){
            const res = await fetch(productsUrl)
            if(!res.ok) throw new Error('There was an error fetching data')
            const salesdata = await res.json()
            // console.log(salesdata.products)
            setData(salesdata.products)
        }
        FetchData()
    },[])
    const productsArc = arc().
        innerRadius(0).
        outerRadius(Math.min(width,height) / 2.5)
    const productsPie = pie().value(d => d.count)
    const colorScale = scaleOrdinal(schemeCategory10)
    if(!data) return(
        <pre>Loading...</pre>
    )
    return (
        <svg width ={width} height={height}>
            <g transform={`translate(${centerX},${centerY})`}>
                {productsPie(categoryData).map((d,i) => {
                    const percentage =((d.data.count / totalCount) * 100).toFixed(2)
                    const[x,y] = productsArc.centroid(d)
                    return(
                        <g key={i}>
                            <path 
                            d = {productsArc(d)}
                            fill = {colorScale(i)}
                            />
                            <text
                             transform = {`translate(${x},${y})`}
                             fill = {"white"}
                             fontSize = {'14'}
                             textAnchor='middle'
                             alignmentBaseline='middle'                                                                                                                                                                                                                                                                            
                            >
                                {percentage} %
                            </text>
                            <text
                                fill={'#000'}
                                textAnchor='middle'
                                alignmentBaseline='middle'
                                fontSize ='16'
                                transform = {`translate(${x},${y + 20})`}
                            >
                                {d.data.category}
                            </text>
                        </g>
                    )
                    
                    })}
            </g>

        </svg>
    )
}
export default SalesPie