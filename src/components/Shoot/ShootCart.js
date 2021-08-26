import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import edit_icon from '../../images/edit_icon.png';
import * as authAction from '../../store/authAction';
import { Modal, Button } from 'react-bootstrap';
import * as orderActions from '../../store/orderAction';

const ShootCart = (props) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false); 
    const dispatch = useDispatch();
    const fetchedProfile = useSelector(state => state.auth.fetchProfile);
    console.log("Fetched Profile: "+JSON.stringify(fetchedProfile));
    const [name, setName] = useState(fetchedProfile[0].firstName);
    const [phone, setPhone] = useState(fetchedProfile[0].phone); 
    const [editProfile, setEditProfile] = useState(false);

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

    const handleInputNameChange = (event) => {
        setName(event.target.value);
    }

    const handleInputPhoneChange = (event) => {
        setPhone(event.target.value);
    }

    const sendShootOrderHandler = async () => {
        setIsLoading(true);
        await dispatch(orderActions.addShootOrders(props.shootTypeId,props.shootType,props.price,props.picCount,name,phone))
        setIsLoading(false);
        alert('Shoot ordered successfully');
    }

    return (
        <>
        <Modal show={editProfile} onHide={() => {setEditProfile(false)}} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <label>Name: 
                    <input type="text" value={name} onChange={handleInputNameChange} />
                </label>
                <br />
                <label>Phone:
                    <input type="text" value={phone}  onChange={handleInputPhoneChange}/>
                </label>    
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {setEditProfile(false)}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        <div style={{margin:'auto'}}>
            <p><strong>Shoot Type:</strong> {props.shootType}</p>
            <p><strong>Price:</strong> Rs. {props.price}/-</p>
            <div style={{boxSizing:'border-box',boxShadow: '10px 6px 10px #67170B'}}>
            <p>Note: Check your details, feel free to edit it, if the information may changed. All the details will be send to this number.</p>
                    <p>Name: {name}</p>
                    <p>Phone: {phone}  <img src={edit_icon} style={{width:20,height:20}} onClick={() => {setEditProfile(!editProfile)}}/></p>
            </div>
            <button style={{backgroundColor:'#67170B',color:'white'}} variant="secondary" onClick={sendShootOrderHandler}>
            Confirm and Book
          </button>
        </div>
        </>
    )
};

export default ShootCart;