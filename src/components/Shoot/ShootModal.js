import React from 'react';
import './ShootModal.css';


const ShootModal = (props) => {
    return ( 
        <div>
        <div className="ShootModal">
            <img src={props.imageData} style={{width:'100px',height:'100px'}}/>
            <p><strong>{props.name}</strong></p>
            <p><strong>{props.description}</strong></p>
            <p><strong>Rs. {props.price}</strong></p>
            <p>Pictures: {props.picCount} Nos</p>
            <p>{props.children}</p>
        </div>
        </div>
    )   
};

export default ShootModal;