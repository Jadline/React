import propTypes from "prop-types"
function List(props){
    
    // fruits.sort((a,b) => 
    //     a.name.localeCompare(b.name)
    // )
    // fruits.sort((a,b) => a.calories - b.calories)
    // fruits.sort((a,b) => b.calories - a.calories)
    // const lowCalFruit = fruits.filter(fruit => fruit.calories < 100)
    // const highCalFruits = fruits.filter(fruit => fruit.calories >= 100)
    const itemList = props.items
    const listItems = itemList.map(item => <li key={item.id}>{item.name} : &nbsp;
    <b>{item.calories}</b></li>)
    
    return(
        <>
        <h3 className="list-category">{props.category}</h3>
        <ul className="list-items">{listItems}</ul>
        </>
    )

}
List.propTypes = {
    category : propTypes.string,
    items : propTypes.arrayOf(propTypes.shape({id:propTypes.number, 
                                            name : propTypes.string,
                                            calories : propTypes.number}))
}
List.defaultProps = {
    category : "Category",
    items : []
}
export default List