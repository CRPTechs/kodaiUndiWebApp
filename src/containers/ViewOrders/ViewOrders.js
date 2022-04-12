import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { fetchOrders, acknowledgeOrder } from '../../store/orderAction';
import './ViewOrders.css';

const Orders = () => {
    const dispatch = useDispatch();
    const [detailsShow, setDetailsShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const bookedOrders = useSelector(state => state.order.orders);
    const selectedOrders = sessionStorage.getItem('selectedOrder');
    const viewSelectedOrders = JSON.parse(selectedOrders);
    const loadOrders = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            let setOrderAction = await fetchOrders();
            dispatch(setOrderAction);
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        loadOrders()
    }, [loadOrders]);
    const viewOrderHandler = (items) => {
        setDetailsShow(true);
        sessionStorage.setItem('selectedOrder', JSON.stringify(items));
    }
    const handleClose = () => setDetailsShow(false);
    const acknowledgeOrderHandler = (id) => {
        const status = 'Delivered';
        dispatch(acknowledgeOrder(id, status));
    }
    return (
        <>
            <Modal show={detailsShow} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='orderDetailHeader'>
                        {selectedOrders &&
                            <>
                                <div><strong>Order ID:</strong> {viewSelectedOrders.id}</div>
                                <div><strong>Order Date:</strong> {viewSelectedOrders.orderDate}</div>
                                <div><strong>Order Time:</strong> {viewSelectedOrders.time}</div>
                                <div><strong>Total Amount:</strong> Rs: {viewSelectedOrders.totalAmount}</div>
                            </>
                        }
                    </div>
                    <div>
                        {viewSelectedOrders !== undefined && viewSelectedOrders.items.map(items =>
                            <div className='orderDetail'>
                                <div className='orderDetailItemsHeader'>
                                    <div className='orderDetailItemsHeader1'>Item Name</div>
                                    <div className='orderDetailItemsHeader2'>Price</div>
                                    <div className='orderDetailItemsHeader3'>Qty</div>
                                    <div className='orderDetailItemsHeader4'>Line Price</div>
                                </div>
                                <div className='orderDetailItemsList'>
                                    <div className='orderDetailItemsList1'>{items.productTitle}</div>
                                    <div className='orderDetailItemsList2'>Rs: {items.productPrice}</div>
                                    <div className='orderDetailItemsList3'>{items.quantity} Nos</div>
                                    <div className='orderDetailItemsList4'>Rs: {items.sum}</div>
                                </div>
                            </div>
                        )}
                        <button className='orderDetailButton' onClick={() => acknowledgeOrderHandler(viewSelectedOrders.id)}>Acknowledge</button>
                    </div>
                </Modal.Body>
            </Modal>
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
                            <th>Status</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookedOrders.map(items =>
                                <tr key={items.id}>
                                    <td>{items.orderDate}</td>
                                    <td>{items.time}</td>
                                    <td>{items.name}</td>
                                    <td>{items.phone}</td>
                                    <td>{items.email}</td>
                                    <td>{items.id}</td>
                                    <td>{items.status}</td>
                                    <td>Rs. {items.totalAmount}</td>
                                    <button className='viewOrderButton' onClick={() => viewOrderHandler(items)}>View</button>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Orders;