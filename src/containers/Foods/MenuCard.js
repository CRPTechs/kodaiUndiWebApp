import React, { useState, useCallback, useEffect } from 'react';
import './MenuCard.css';
import { useSelector, useDispatch } from 'react-redux';
import * as itemsAction from './actions';
import Menu from '../../components/Menu/Menu';
import * as cartActions from '../../store/cartAction';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authAction from '../../store/authAction';
import { Modal, Button } from 'react-bootstrap';
import Data from '../../components/Data/Data';

const MenuCard = (props) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const items = useSelector(state => state.foods.availableItems);
    const categories = useSelector(state => state.foods.availableCategories);
    console.log("Categories: " + JSON.stringify(categories));
    const [detailsShow, setDetailsShow] = useState(false);
    const [category, setCategory] = useState();
    const [menuShow, setMenuShow] = useState(false);
    const [dataShow, setDataShow] = useState(false);
    const [alert, setAlert] = useState(false);

    const loadItems = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            let setItemsAction = await itemsAction.fetchItems();
            dispatch(setItemsAction);
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        loadItems()
    }, [loadItems]);

    const handleHistory = () => {
        if (props.isAuthenticated) {
            history.push("/cart");
        } else {
            props.onSetAuthRedirectPath('/cart');
            history.push("/auth");
        }
    }

    const selectHandler = (category) => {
        console.log(category);
        setCategory(category);
        setMenuShow(prevState => !prevState);
    }

    return (
        <>
            <Modal show={detailsShow} onHide={() => { setDetailsShow(false) }} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <ShootCart 
            shootTypeId={shootTypeId}
            shootType={shootType}
            price={price}
            picCount={picCount}/> */}
                    <p>Details show</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setDetailsShow(false) }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={menuShow} onHide={() => { setMenuShow(false) }} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{category}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Menu category={category}>
                        {/* <button className="OrderButton"
                            onClick={() => { dispatch(cartActions.addToCart(item)) }}>Add To Cart</button> */}
                    </Menu>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setMenuShow(false) }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={dataShow} onHide={() => { setDataShow(false) }} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Details for the Order.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Data />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setDataShow(false) }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div style={{ float:'right', marginTop:'7%' }}>
            <button className="BookButton" onClick={() => setDataShow(prevState => !prevState)}>*Add details</button>
            </div>
            <div className="MenuCard">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {categories.map(item => (
                            <button className="categoryButton" onClick={() => { selectHandler(item) }}>{item}
                            </button>
                    ))}
                </div>
                {/* <div style={{margin: '20px auto',width:'80%',textAlign:'center', padding:'10px'}}>
                    <Data />
                </div> */}
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

export default connect(mapStateToProps, mapDisptachToProps)(MenuCard);
