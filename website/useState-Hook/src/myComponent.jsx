import React,{useState} from "react"

function MyComponent(){
    /*the useState contains an array with two elements,a variable and a setter function*/
    const [name,setName] = useState("Guest")
    const[age,setAge] = useState(0)
    const[isEmployed,setIsEmployed] = useState(false)
    const updateName = () => {
        setName("spongebob")
    } 
    const incrementAge = () => {
        setAge(age+10)
    }
    const checkEmploymentStatus = () => {
        setIsEmployed(!isEmployed)
    }
    return(
        <div>
            <p>Name : {name}</p>
            <button onClick={updateName}>set Name</button>

            <p>Age : {age}</p>
            <button onClick={incrementAge}>Increment Age</button>

            <p>isEmployed : {isEmployed ? "Yes" : "No"}</p>
            <button onClick={checkEmploymentStatus}>Toggle Status</button>
        </div>
    )
}
export default MyComponent