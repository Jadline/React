import React, {useState,useEffect,useRef} from "react"

function MyComponent(){

    const ref = useRef(0)

    // let [number,setNumber] = useState(0)
    useEffect(() => {
        console.log("component rendered")
    })
    function handleClick(){
        ref.current++;
        console.log(ref.current)
       
    }

    return(
        <button onClick={handleClick}>Click me</button>
    )

}
export default MyComponent