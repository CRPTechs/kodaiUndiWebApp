import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ViewRoomOrders.css';
import * as orderAction from '../../store/orderAction';
import {Button,Modal} from 'react-bootstrap';
import RoomOrderDetails from '../../components/Orders/RoomOrders';

const RoomOrders = () => {
    const roomOrders = useSelector(state => state.order.roomOrders);
    console.log("Room Orders" +JSON.stringify(roomOrders));
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const [show, setShow] = useState(false);
    const [id, setId] = useState();
    const [hotelId, setHotelId] = useState();

    const detailsClose = () => {
        setShow(false);
    }

    const detailsShow = (id,hotelId) =>{
        setId(id);
        setHotelId(hotelId);
        setShow(true);
    } 

    const loadRoomOrders = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            let setRoomOrdersAction = await orderAction.fetchRoomOrders();
            dispatch(setRoomOrdersAction);
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() =>{
        loadRoomOrders()
    },[loadRoomOrders]);


    return (
        <div className="ViewRoomOrders">
            <Modal show={show} onHide={detailsClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <RoomOrderDetails id={id} hotelId={hotelId}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={detailsClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
            <h4>Room Orders</h4>
            <table className="table table-border table-stripped">
                <thead className="thead-light">
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Check-in Date</th>
                        <th>Check-in Time</th>
                        <th>Check-out Date</th>
                        <th>Check-out Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {
                Object.keys(roomOrders).map(id => {
                    return <tr key={id}>
                        <td>{roomOrders[id].personName}</td>
                        <td>{roomOrders[id].personPhone}</td>
                        <td>{roomOrders[id].checkInDate}</td>
                        <td>{roomOrders[id].checkInTime}</td>
                        <td>{roomOrders[id].checkOutDate}</td>
                        <td>{roomOrders[id].checkOutTime}</td>
                        <td>{roomOrders[id].status}</td>
                        <td><button variant="primary" onClick={() => {detailsShow(roomOrders[id].id,roomOrders[id].hotelId)}}>Details</button></td>
                    </tr>
                }
                    )}
                </tbody>
            </table>
        </div>
    )
};

export default RoomOrders;