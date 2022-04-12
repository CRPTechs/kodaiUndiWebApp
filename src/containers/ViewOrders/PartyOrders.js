import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { fetchOrders, acknowledgeOrder, fetchPartyOrders, acknowledgePartyOrder } from '../../store/orderAction';
import './ViewOrders.css';

const PartyOrdersList = () => {
    const dispatch = useDispatch();
    const [detailsShow, setDetailsShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const bookedPartyOrders = useSelector(state => state.order.partyOrders);
    const loadPartyOrders = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            let setOrderAction = await fetchPartyOrders();
            dispatch(setOrderAction);
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        loadPartyOrders()
    }, [loadPartyOrders]);
    const acknowledgeOrderHandler = (id) => {
        const status = 'Delivered';
        dispatch(acknowledgePartyOrder(id, status));
        alert('Party Order delivered and closed');
    }
    return (
            <div className="ViewOrders">
                <table className="table table-border table-stripped">
                    <thead className="thead-light">
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Name</th>
                            <th>Phone No.</th>
                            <th>Email</th>
                            <th>Order Id</th>
                            <th>Category</th>
                            <th>Menu Choices</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookedPartyOrders.map(items =>
                                <tr key={items.id}>
                                    <td>{items.date}</td>
                                    <td>{items.time}  {items.meridian}</td>
                                    <td>{items.name}</td>
                                    <td>{items.phone}</td>
                                    <td>{items.email}</td>
                                    <td>{items.id}</td>
                                    <td>{items.category}</td>
                                    <td>{items.menu}</td>
                                    <td>{items.status}</td>
                                    <button className='viewOrderButton' onClick={() => acknowledgeOrderHandler(items.id)}>Acknowledge</button>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
    )
}

export default PartyOrdersList;