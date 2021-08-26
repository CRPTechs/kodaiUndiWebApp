import React, { useState, useEffect } from 'react';
import db from '../../firebaseService';
import './ViewOrders.css';

const Orders = () => {
    var [ordersList, setOrdersList] = useState({});

    useEffect(() => {
        db.child('orders').on('value', snapshot => {
            if (snapshot.val() != null)
                setOrdersList({
                    ...snapshot.val()
                })
            console.log(setOrdersList);
        })
    }, [setOrdersList])
    return (
        <div className="ViewOrders">
            <table className="table table-border table-stripped">
                <thead className="thead-light">
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Phone No.</th>
                        <th>Order Id</th>
                        <th>Payment Id</th>
                        <th>Status</th>
                        <th>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(ordersList).map(id => {
                            return <tr key={id}>
                                <td>{ordersList[id].orderDate}</td>
                                <td>{ordersList[id].name}</td>
                                <td>{ordersList[id].phone}</td>
                                <td>{ordersList[id].razorpay_order_id}</td>
                                <td>{ordersList[id].razorpay_payment_id}</td>
                                <td>{ordersList[id].status}</td>
                                <td>{ordersList[id].totalAmount}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Orders;