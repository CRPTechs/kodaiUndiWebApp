import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Menu.css';
import MenuModal from './MenuModal';
import * as cartActions from '../../store/cartAction';
import { Modal, Button } from 'react-bootstrap';

const Menu = (props) => {
    const [alert, setAlert] = useState(false);
    const showAlert = () => {
        setAlert(true);
        setTimeout(() => {
            setAlert(false);
        }, 2000);
    };
    const category = props.category;
    const items = useSelector(state => state.items.availableItems.filter(items => items.category === category));
    const dispatch = useDispatch();
    return (
        <>
        <Modal show={alert} onHide={() => { setAlert(false) }}>
                <div>
                    <p>1 item added to the cart</p>
                    </div>
            </Modal>
        <div className="Menu">
            {items.map(items => 
                 <MenuModal 
                 image={items.imageData}
                 title={items.title}
                 category={items.category}
                 price={items.price}
                 meal={items.meal}>
                     <button className="bookButton" onClick={() => { dispatch(cartActions.addToCart(items)); showAlert() }}>Add to Cart</button>
                     <button className="bookButton">Add to wishlist</button>
                     </MenuModal>           
                 )}

        </div>
        </>
    )
};

export default Menu;