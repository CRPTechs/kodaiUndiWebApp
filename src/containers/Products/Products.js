import React, { useState, useCallback, useEffect } from 'react';
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import * as itemsAction from './actions';
import Product from '../../components/Products/Products';
import * as cartActions from '../../store/cartAction';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authAction from '../../store/authAction';
import ProductData from '../../components/ProductData/ProductData';
import { Modal, Button } from 'react-bootstrap';
import logo from '../../images/icon.png';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

const Products = (props) => {
    const [crumbs, setCrumbs] = useState(['Home','Products']);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const products = useSelector(state => state.products.availableProducts);
    const [dataShow, setDataShow] = useState(false);
    const [alert, setAlert] = useState(false);

    const selected = (crumb) => {
        console.log(crumb);
    }

    const showAlert = () => {
        setAlert(true);
        setTimeout(() => {
            setAlert(false);
        }, 2000);
    };

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            let setProductsAction = await itemsAction.fetchProducts();
            dispatch(setProductsAction);
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        loadProducts()
    }, [loadProducts]);

    const handleHistory = () => {
        if (props.isAuthenticated) {
            history.push("/cart");
        } else {
            props.onSetAuthRedirectPath('/cart');
            history.push("/auth");
        }
    }

    return (
        <>
            <div className="productsHeader"> 
            <Breadcrumb crumbs={crumbs} selected={selected}/>
                <img src={logo} className="undiLogo" />
                <span className="undiName"><strong>Kodai Undi</strong></span>
            </div>
            <Modal show={alert} onHide={() => { setAlert(false) }}>
                <div>
                    <p>1 item added to the cart</p>
                </div>
            </Modal>
            <Modal show={dataShow} onHide={() => { setDataShow(false) }} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Details for the Order.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProductData />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setDataShow(false) }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div style={{ float: 'right' }}>
                <button className="BookButton" onClick={() => setDataShow(prevState => !prevState)}>*Add details</button>
            </div>
            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: 'auto',
                padding: '10px',
                marginTop: '6%',
            }}>
                <div className="Products">
                    {products.map(product => (
                        <Product
                            key={product.title}
                            imageData={product.imageData}
                            title={product.title}
                            price={product.price}>
                            <button className="OrderButton"
                                onClick={() => { dispatch(cartActions.addToCart(product)); showAlert() }}>Add To Cart</button>
                            <div style={{ padding: '10px' }}>
                                <button className="OrderButton"
                                    onClick={() => { dispatch(cartActions.addToCart(product)) }}>Add To Wishlist</button>
                            </div>
                        </Product>
                    ))}
                </div>
            </div>
            <button onClick={handleHistory} className="BookButton">
                {props.isAuthenticated ? 'Book My Order' : 'Sign In to Order'}</button>
        </>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDisptachToProps = dispatch => {
    return {
        onSetAuthRedirectPath: (path) => dispatch(authAction.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(Products);
