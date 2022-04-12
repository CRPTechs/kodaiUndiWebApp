import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './MenuModal.css';

const MenuModal = (props) => {
    return (
        <div className='modalContainer'>
            <div className='modalRow'>
                <div className="modalImage">
                    <img src={props.image} style={{ width: '150px', height: '100px' }} />
                </div>
                <div className='responsiveModal'>
                    <div className="modalColumn">
                        <p><strong>{props.title}</strong></p>
                        <p>Rs. {props.price}</p>
                        {/* <p>{props.meal}</p> */}
                    </div>
                    <div className="columnChildren">
                        <p>{props.children}</p>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
};

export default MenuModal;