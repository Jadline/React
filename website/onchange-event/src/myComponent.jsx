import React, {useState} from "react"

function MyComponent(){
    const[name,setName] = useState("Guest")
    const[quantity,setQuantity] = useState(0)
    const[comment,setComment] = useState()
    const[payment,setPayment] = useState()
    const[shipping,setShipping] = useState()
    function handleNameChange(event){
        setName(event.target.value)
    }
    function handleQuantity(event){
        setQuantity(event.target.value)
    }
    function handleComments(event){
        setComment(event.target.value)
    }
    function handlePayment(event){
        setPayment(event.target.value)
    }
    function handleShipping(event){
        setShipping(event.target.value)
    }
    return(
        <div>
            <input value={name} onChange={handleNameChange}/>
            <p>Name : {name}</p>

            <input value={quantity} onChange={handleQuantity} type="number"/>
            <p>Quantity : {quantity}</p> 
            <textarea value={comment} onChange={handleComments} placeholder="please make your comment"/>
            <p>Comment : {comment}</p>

            <select value={payment} onChange={handlePayment}>
                <option value="select an option"></option>
                <option value="Visa">Visa</option>
                <option value="MasterCard">MasterCard</option>
                <option value="GiftCard">GiftCard</option>
            </select>
            <p>Payment : {payment}</p>
            <label>
                <input type="radio" value="pick up" checked = {shipping === "pick up" } onChange = {handleShipping}/>
                pick up
            </label>
            <label>
                <input type="radio" value="Delivery" checked={shipping === "Delivery"} onChange={handleShipping}/>
                Delivery
            </label>
            <p>shipping : {shipping}</p>
        </div>
    )
}
export default MyComponent