import React, {useState} from "react"
function MyComponent(){
    const [foods,setFoods] = useState(['apple','orange','banana'])
    function handleAddFoods(){
        const newFood = document.getElementById('foodInput').value
        document.getElementById('foodInput').value = ""

        setFoods(f => [...f,newFood])

    }
    function handleRemoveFoods(index){
        setFoods(foods.filter((element,i) => i !== index))
    }
    return(
        <div>
            <h2>List of Foods</h2>
            <ul>
                {foods.map((food,index) => <li key = {index} onClick= {() => handleRemoveFoods(index)}>{food}</li>)}
            </ul>
            <input type="text" id="foodInput" placeholder ="Enter food name"/>
            <button onClick={handleAddFoods}>Add Foods</button>
        </div>
    )
    
}
export default MyComponent