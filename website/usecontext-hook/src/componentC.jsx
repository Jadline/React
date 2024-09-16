import ComponentD from "./componentD.jsx"

import React, {useContext} from "react"
import {userContext} from "./componentA.jsx"
function ComponentC(){
    const user = useContext(userContext)
    return(
        <div className ="box">
            <h1>ComponentC</h1>
            <h2>my name is {user}</h2>
            <ComponentD />

        </div>
    )
}
export default ComponentC