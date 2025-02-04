import {useEffect,useState} from 'react'
import {arc,pie,scaleOrdinal,schemeCategory10} from 'd3'
const productsUrl = 'https://dummyjson.com/products'
const width = 960;
const height = 500
const centerX = width / 2
const centerY = height / 2
function BrandPie(){
    //loading the data 
    const[brandData,setBrandData] = useState(null) 
    const brands = []
    const brandArc = arc().
        innerRadius(0).
        outerRadius(Math.min(width,height) / 2.5)
    brandData?.forEach((product) => {
        if(brands.includes(product.brand)) return
        brands.push(product.brand)
    })
    const brandCategories = brands.map((brand) => {
        const modifiedbrand = brand === undefined ? 'others' : brand
        return{
            brand : modifiedbrand,
            count : brandData?.filter((product) => product.brand === brand).length
        }
    })
    
    console.log(brandCategories)
    const totalCount = brandCategories.reduce((acc,brandcategory) => acc + brandcategory.count,0 )
    const brandChart = pie().value(d => d.count)
    const colorScale = scaleOrdinal(schemeCategory10)

    useEffect(() => {
        async function fetchBrand(){
            const res = await fetch(productsUrl)
            if(!res.ok) throw new Error('There was an error fetching data')
            const data = await res.json()
            // console.log(data.products)
            setBrandData(data.products)

        }
        fetchBrand()
    },[])
    if (!brandData) return <pre>Loading...</pre>
    return (
        <svg width = {width} height={height}>
            <g transform ={`translate(${centerX},${centerY})`}>
                {brandChart(brandCategories).map((d,i) => {
                    const percentage = ((d.data.count / totalCount) * 100).toFixed(2)
                    const[x,y] = brandArc.centroid(d)
                    const labelOffset = 200
                    const labelX = x + (x > 0 ? labelOffset : -labelOffset)
                    const labelY = y
                    return(
                        <g key={i}> 
                        <path 
                         d={brandArc(d)}
                        fill= {colorScale(i)}
                        />
                
                        <text
                        fill = {'#000'}
                        fontSize = {'16'}
                        textAnchor ={'middle'}
                        alignmentBaseline={'middle'}
                        transform= {`translate(${x},${y})`}

                        >
                            {d.data.brand}
                        </text>
                        <text
                        fill = {'white'}
                        fontSize = {10}
                        textAnchor = {'middle'}
                        alignmentBaseline={'middle'}
                        transform ={`translate(${x},${y+20})`}
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
export default BrandPie