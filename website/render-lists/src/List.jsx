
function List(){
    const fruits = [{name :"apple",
        calories : 95,
        id : 1
    },
        {name :"orange",
            calories : 45,
            id : 2
        },
        {name : "pineapple",
            calories :  37,
            id : 3
        },
        {name : "coconut",
            calories : 159,
            id : 4
        }]
    // fruits.sort((a,b) => 
    //     a.name.localeCompare(b.name)
    // )
    fruits.sort((a,b) => a.calories - b.calories)
    const listItems = fruits.map(fruit => <li key={fruit.id}>{fruit.name} : &nbsp;
    <b>{fruit.calories}</b></li>)
    
    return(
        <ul>{listItems}</ul>
    )

}
export default List