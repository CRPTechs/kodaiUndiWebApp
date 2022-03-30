import React, { useState } from 'react';
import MenuCard from '../Foods/MenuCard';
import Header from '../Header/Header';
import { Modal } from 'react-bootstrap';
import Data from '../../components/Data/Data';
import { useSelector } from 'react-redux';
import productPoster from '../../images/food_products_poster.jpg';
import accomodationPoster from '../../images/accomodation_poster.jpg';
import photographyPoster from '../../images/photography_poster.jpg';
import './Orders.css';

const Orders = () => {
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
                prodWeight: state.cart.items[key].prodWeight
            });
        }
        return transformedCartItems.sort((a, b) =>
            a.productId > b.productId ? 1 : -1
        );
    });
    // const cartButtonEnable = useSelector(state => state.cart.items);
    console.log(cartItems);
    const [isSelected, setIsSelected] = useState('food');
    const [isFoodType, setIsFoodType] = useState('Alacarte');
    const [detailsShow, setDetailsShow] = useState(false);
    const [previewCart, setPreviewCart] = useState(false);
    const selectHandler = (option) => {
        setIsSelected(option);
    }
    const toCartHandler = () => {
        setDetailsShow(true);
        // history.push('/details');
    }
    const previewCartHandler = () => {
        setPreviewCart(true);
    }
    const foodTypeHandler = (option) => {
        setIsFoodType(option);
    }
    const handleClose = () => {
        setPreviewCart(false);
        setDetailsShow(false);
    }
    return (
        <>
            <Modal show={previewCart} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Preview Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {cartItems.map(items =>
                        <div className="Cart">
                            <div className="Cartdiv">
                                <div className='cartTitle'>{items.productTitle}</div>
                                <div className='cartQty'>{items.quantity}(Nos)</div>
                                <div className='cartPrice'><strong>Rs. {items.productPrice}</strong></div>
                            </div>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
            <Modal show={detailsShow} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Data />
                </Modal.Body>
            </Modal>
            <Header />
            <div id='orderContainer'>
                <div className='orderOptions'>
                    <div className={isSelected === 'food' ? 'optionSelected' : 'foodOption'} onClick={() => selectHandler('food')}>Foods</div>
                    {/* <div className={isSelected === 'product' ? 'optionSelected' : 'productOption'} onClick={() => selectHandler('product')}>Products</div>
                    <div className={isSelected === 'room' ? 'optionSelected' : 'roomOption'} onClick={() => selectHandler('room')}>Rooms</div>
                    <div className={isSelected === 'photography' ? 'optionSelected' : 'photographyOption'} onClick={() => selectHandler('photography')}>Photography</div> */}
                </div>
                <div className='cartOptions'>
                    {cartItems.length > 0 && <div onClick={previewCartHandler} className='moveToCartButton'>Preview Cart</div>}
                    {cartItems.length > 0 && <div onClick={toCartHandler} className='moveToCartButton'>Move to Cart</div>}
                </div>
            </div>
            {isSelected === 'food' &&
                <>
                    <div className='foodTypesDiv'>
                        <div className={isFoodType === 'Alacarte' ? 'optionSelected' : 'foodTypesList'} onClick={() => foodTypeHandler('Alacarte')}>Alacarte</div>
                        <div className={isFoodType === 'Party' ? 'optionSelected' : 'foodTypesList'} onClick={() => foodTypeHandler('Party')}>Party Orders</div>
                    </div>
                    {isFoodType === 'Alacarte' &&
                        <MenuCard />
                    }
                </>}
            {isSelected === 'product' &&
                <div className='posterDiv'><img className='posterImage' src={productPoster} /></div>}
            {isSelected === 'room' &&
                <div className='posterDiv'><img className='posterImage' src={accomodationPoster} /></div>}
            {isSelected === 'photography' &&
                <div className='posterDiv'><img className='posterImage' src={photographyPoster} /></div>}
        </>
    )
};

export default Orders;