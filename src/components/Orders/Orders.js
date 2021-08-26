import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import './Orders.css';

const Orders = (props) => {
    const [showDetails,setShowDetails] = useState(false); 
    console.log("Props:" +JSON.stringify(props));
    return (
        <div className="Orders">
            <p><strong>Order Id:</strong> {props.id}</p>
            <p><strong>Name:</strong> {props.data.formData.name} <strong>Phone:</strong> {props.data.formData.phone}</p>
            {props.data.formData.address ? 
            <p><strong>Address: </strong>{props.data.formData.address},{props.data.formData.zipcode},{props.data.formData.country}</p>
            : null}
            {props.data.formData.date ? 
            <p><strong>Date and Time: </strong>{props.data.formData.date},{props.data.formData.hours}:{props.data.formData.mins} {props.data.formData.meridian}</p>
            : null}
            <p><strong>Status:</strong> {props.status}</p>
            <p><strong>Total Amount:</strong> Rs. {props.totalAmount}</p>
        <button className="Button" onClick={() =>{setShowDetails(prevState => !prevState)}}>
            {showDetails ? "Hide Details" : "Show Details"}
        </button>
        {showDetails && <div>
            {props.items.map(cartItem => <Cart 
            key={cartItem.productTitle}
            quantity={cartItem.quantity}
            productPrice={cartItem.productPrice}
            prodWeight={cartItem.prodWeight}
            productTitle={cartItem.productTitle}
                />)}
                </div>}
        </div>
    );
}

export default Orders;