import React from 'react';
import './Cart.css';

const Cart = (props) => {
    return (
        <div className="Cart">
            <div> 
            <p>{props.cartTotalAmount}</p>
            </div>
        <div className="Cartdiv">
            <p>{props.productTitle} --- {props.quantity}(Nos) ---{ props.prodWeight } <strong>Rs. {props.productPrice}</strong> {props.children}</p>
        </div>
        </div>
    )
};

export default Cart;