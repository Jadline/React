import ComponentC from "./componentC.jsx"
import React, {useContext} from "react"
import {userContext} from "./componentA.jsx"
function ComponentB(){
    const user = useContext(userContext)
    return(
        <div className ="box">
            <h1>ComponentB</h1>
            <h2>My other name is {user}</h2>

            <ComponentC />

        </div>
    )
}
export default ComponentB