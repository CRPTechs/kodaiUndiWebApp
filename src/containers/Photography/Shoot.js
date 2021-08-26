import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as itemsAction from './actions';
import * as authAction from '../../store/authAction';
import * as cartActions from '../../store/cartAction';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import ShootModal from '../../components/Shoot/ShootModal';
import ShootCart from '../../components/Shoot/ShootCart';
import './Shoot.css';
import { Modal, Button } from 'react-bootstrap';
import background_image from '../../images/bg1.jpg';

const Shoot = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const shoots = useSelector(state => state.shoots.fetchedPhotography);
    const [shootTypeId, setShootTypeId] = useState();
    const [shootType, setShootType] = useState();
    const [price, setPrice] = useState();
    const [picCount, setPicCount] = useState();
    const [showCart, setShowCart] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const loadedPhotography = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try { 
            let setPhotographyAction = await itemsAction.fetchPhotography();
            dispatch(setPhotographyAction);
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        loadedPhotography()
    }, [loadedPhotography]);

    const loadedProfile = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            let setProfileAction = await authAction.fetchProfile();
            dispatch(setProfileAction);
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        loadedProfile()
    }, [loadedProfile]);

    const showCartHandler = (shootTypeId,shootType,price,picCount) => {
        setShootTypeId(shootTypeId);
        setShootType(shootType);
        setPrice(price);
        setPicCount(picCount);
        setShowCart(true);   
    }

    return (
        <div style={{ backgroundImage: `url(${background_image})`, backgroundRepeat: 'repeat',
        marginTop:'7%', display:'flex',width:'100%',margin:'auto',padding:'10px 10px'}}>
             <Modal show={showCart} onHide={() => {setShowCart(false)}} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ShootCart  
            shootTypeId={shootTypeId}
            shootType={shootType}
            price={price}
            picCount={picCount}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {setShowCart(false)}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
                {shoots.map(shoot =>
                    <ShootModal
                        key={shoot.id}
                        name={shoot.name}
                        description={shoot.description}
                        price={shoot.price}
                        picCount={shoot.picCount}>
                            <button className="OrderButton" onClick={() => {showCartHandler(shoot.id,shoot.name,shoot.price,shoot.picCount)}}>View Pics</button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button className="OrderButton" onClick={() => {showCartHandler(shoot.id,shoot.name,shoot.price,shoot.picCount)}}>Book</button>
                            </ShootModal>
                    )}
        </div>
    )
};

export default Shoot;