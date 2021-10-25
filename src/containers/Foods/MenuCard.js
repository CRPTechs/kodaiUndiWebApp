import React, { useState, useCallback, useEffect } from 'react';
import './MenuCard.css';
import { useSelector, useDispatch } from 'react-redux';
import * as itemsAction from './actions';
import Menu from '../../components/Menu/Menu';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authAction from '../../store/authAction';
import { Modal, Button } from 'react-bootstrap';
import Data from '../../components/Data/Data';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import underline from '../../images/underline.png';

const MenuCard = (props) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const items = useSelector(state => state.foods.availableItems);
    const categories = useSelector(state => state.foods.availableCategories);
    const [detailsShow, setDetailsShow] = useState(false);
    const [category, setCategory] = useState();
    const [menuShow, setMenuShow] = useState(false);
    const [dataShow, setDataShow] = useState(false);
    const [alert, setAlert] = useState(false);
    const [value, setValue] = useState(0);

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
        // if (props.isAuthenticated) {
        history.push("/cart");
        // } else {
        // props.onSetAuthRedirectPath('/cart');
        // history.push("/auth");
        // }
    }

    const selectHandler = (category) => {
        console.log(category);
        setCategory(category);
        setMenuShow(prevState => !prevState);
    }

    // const handleChange = (e,val) => {
    //     console.log(val);
    //     setValue(val);
    // }

    return (
        <div className="menuContainer">
            {/* <div>
                <button className="BookButton" onClick={() => setDataShow(prevState => !prevState)}>*Add details</button>
            </div> */}
            <h2>Menu Cart</h2>
            <img src={underline} className="imageUnderline" />
            {/* <div className="buttonContainer">
                <button onClick={handleHistory} className="toCartButton">
                    {props.isAuthenticated ? 'Book My Order' : 'Sign In to Order'}</button>
            </div> */}
            <div className="MenuCard">
                <div className="categoryContainer">
                    {categories.map(item => (
                        <li className="categoryList">
                            <a className="categoryAnchors" onClick={() => selectHandler(item)}><strong>{item}</strong></a>
                        </li>
                    ))}
                </div>
                <Menu category={category} />
            </div>
        </div>
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
