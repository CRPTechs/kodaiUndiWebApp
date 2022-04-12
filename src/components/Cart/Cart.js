import React from 'react';
import './Cart.css';

const Cart = (props) => {
    return (
        <div className="Cart">
            <div className="Cartdiv">
                <div className='cartTitle'>{props.productTitle}</div>
                <div className='cartQty'>{props.quantity}(Nos)</div>
                {/* <div>{props.prodWeight}</div> */}
                <div className='cartPrice'><strong>Rs. {props.productPrice}</strong></div>
                <div className='cartChildren'>{props.children}</div>
            </div>
        </div>
    )
};

export default Cart; 