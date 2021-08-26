import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Orders from '../../components/Orders/Orders';
import * as orderAction from '../../store/orderAction';
import './UserOrders.css';
import { connect } from 'react-redux';

const UserOrders = (props) => {
    const orders = useSelector(state => state.order.orders);
    console.log("UserOrders" +JSON.stringify(orders));
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const loadOrders = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            let setOrdersAction = await orderAction.fetchOrders();
            dispatch(setOrdersAction);
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() =>{
        loadOrders()
    },[loadOrders]);

    if(orders.length === 0 && props.isAuthenticated === null) {
        return (
            <div>
                <p>No orders, maybe start ordering?</p>
            </div>
        )
    }

    return (
        <div className="UserOrders">
            <h4>Your orders</h4>
            <div>
            {orders.map((order) => 
            <Orders 
            key={order.id}
            id={order.id}
            status={order.status}
            items={order.items}
            data={order.data}
            totalAmount = {order.totalAmount}
            />
            )
            }
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps,null)(UserOrders);