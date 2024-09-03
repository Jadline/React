
import List from "./List.jsx"
function App() {
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
  const vegetables = 
  [{name :"potatoes",
    calories : 110,
    id : 6
},
    {name :"colory",
        calories : 15,
        id : 7
    },
    {name : "carrots",
        calories :  25,
        id : 8
    },
    {name : "corn",
        calories : 63,
        id : 9
    },
  {
    name : "brocolli",
    calories :50,
    id : 10
  }]
  return (
    <>
      {fruits.length > 0 ? <List items={fruits} category="fruits"/> : null}
      {vegetables.length > 0 ? <List items = {vegetables} category ="Vegetables"/> : null}
  
    </>
  )
 
}

export default App
