import {useState,useEffect} from "react"
function MyComponent (){
    // const[count,setCount] = useState(0)
    // //useeffect takes in a function and dependencies
    // //it acts as a side code and runs after the component has rendered 
    // //if you dont add the dependencies array it will run everytime the component function runs
    // //if you add the dependencies it will run once
    // //if you run the with the dependency having a value,,it will run each time
    // useEffect(() => {
    //     document.title = `count : ${count} `
    // },[])

    // function addCount(){
    //     setCount(c => c + 1)

        
    // }
    // function subtractCount(){
    //     setCount(c => c - 1)
    // }
    // return(
    //     <>
    //         <p>Count : {count}</p>
    //         <button onClick={addCount}>Add</button>
    //         <button onClick={subtractCount} > Subtract</button>
    //     </>
    // )
    const[width,setWidth] = useState(window.innerWidth);
    const[height,setHeight] = useState(window.innerHeight)

    useEffect(() => {
        window.addEventListener('resize',handleResize)
        console.log("event listener added")

        return() => {
            window.removeEventListener("resize",handleResize)
        }
    },[])
    useEffect(() => {
        document.title = `${width} x ${height}`

    
    },[width,height])
   
    function handleResize(){
        setWidth(window.innerWidth);
        setHeight(window.innerHeight)
    }
    return(
        <>
            <p>Window Width : {width}px</p>
            <p>Window Height : {height}px</p>
        </>
    )
}
export default MyComponent