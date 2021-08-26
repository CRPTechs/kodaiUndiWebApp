import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as itemAction from '../../containers/Accomodation/actions';
import * as orderAction from '../../store/orderAction';
import './RoomOrders.css';

const RoomOrderDetails = (props) => {
    const dispatch = useDispatch();
    const id = props.id;
    const hotelId = props.hotelId;
    const selectedRoom = useSelector(state => state.order.roomOrders.filter(room => room.id === id));
    const accomodationDetails = useSelector(state => state.items.availableAccomodation.filter(accomodation => accomodation.id === hotelId));
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const loadAccomodation = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            let setAccomodationAction = await itemAction.fetchAccomodation();
            dispatch(setAccomodationAction);
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        loadAccomodation()
    }, [loadAccomodation]);

    const updateCheckInHandler = async () => {
        setIsLoading(true);
        await dispatch(orderAction.updateRoomOrder(props.id,'Checked In'));
        alert('Room status changed to checked in');
        setIsLoading(false);
    }

    const updateCheckOutHandler = async () => {
        setIsLoading(true);
        await dispatch(orderAction.updateRoomOrder(props.id,'Checked Out'));
        alert('Room status changed to checked out');
        setIsLoading(false);
    }


    return (
        <div>
            {accomodationDetails.map(accomodation =>
                <div className="RoomOrders">
                    <h5>Hotel Details</h5>
                    <p><strong>Hotel Name:</strong>{accomodation.name}</p>
                    <p><strong>Address:</strong>{accomodation.address}</p>
                    <p><strong>Persons occupancy:</strong>{accomodation.persons}</p>
                    <p><strong>Price per Room:</strong>{accomodation.price}</p>
                    <p><strong>Food:</strong>{accomodation.foods}</p>
                    </div>
            )}
            {selectedRoom.map(room =>
            <>
                <div className="RoomOrders">
                    <h5>Order Details</h5>
                    <p><strong>Order Id:</strong>{room.id}</p>
                    <p><strong>Rooms Count:</strong>{room.roomsCount}</p>
                    <p><strong>Children:</strong>{room.children}</p>
                    <p><strong>Total Price Paid:</strong>{room.totalPrice}</p>
                    <p><strong>Status:</strong>{room.status}</p>
                </div>
                <button className="checkButton" onClick={updateCheckInHandler}>Check In</button>
                <button className="checkButton" onClick={updateCheckOutHandler}>Check Out</button>
                </>
            )}
        </div>
    )
};

export default RoomOrderDetails;