import base64 from 'base-64';
import Order from '../models/order';
import roomOrder from '../models/roomOrders';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';
export const PAYMENT_INITIATED = 'PAYMENT_INITIATED';
export const ADD_DETAILS = 'ADD_DETAILS';
export const ADD_ADDRESS = 'ADD_ADDRESS';
export const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';
export const PAYMENT_FAILED = 'PAYMENT_FAILED';
export const FETCH_ROOM_ORDERS = 'FETCH_ROOM_ORDERS';
export const ADD_SHOOT_ORDERS = 'ADD_SHOOT_ORDERS';

export const addShootOrders = (shootTypeId,shootType,price,picCount,name,phone,props) => {
    return async (dispatch,getState) => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');              
        const createdDate = new Date();
        const shootOrder = {
            shootTypeId,
            shootType,
            price,
            picCount,
            name,
            phone,
            status: 'Booked',
            createdDate,
            userId
        };
        const response = await fetch (  
            `https://crpapp-default-rtdb.firebaseio.com/shootOrders.json?auth=${token}`,
            {
                method: 'POST',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(
                    shootOrder
                )
            }
        );
        if(!response.ok) {
            // throw new Error('Something went wrong');
            props.history.push('/login');
        }
        const resData = await response.json();
        dispatch({
            type: ADD_SHOOT_ORDERS, 
            shootOrderData: {
                id: resData.name, 
                ...shootOrder
            }
        });
    }
}
export const fetchRoomOrders = () => {
    return async (dispatch,getState) => {
        const userId = getState().auth.userId;
        const token = getState().auth.token;
        console.log(getState());
        try {
            const response = await fetch(
                `https://crpapp-default-rtdb.firebaseio.com/roomOrders.json`
            );

            // if(!response.ok) {  
            //     throw new Error('Something went wrong'+JSON.stringify(response));
            // }

            const resData = await response.json();
            console.log("Fetched Room Orders:" +JSON.stringify(resData));
            const loadedRoomOrders = [];
    
                for( const key in resData) {
                    let order = new roomOrder(
                        key,
                        resData[key].hotelId, 
                        resData[key].personName,
                        resData[key].personPhone,
                        resData[key].checkInDate,
                        resData[key].checkInTime,
                        resData[key].checkOutDate,
                        resData[key].checkOutTime,
                        resData[key].children,
                        resData[key].roomsCount,
                        resData[key].status,
                        resData[key].totalPrice
                    );
                    loadedRoomOrders.push( order );           
                }
                // loadedOrders.sort((a,b) => {
                //     console.log("First Date:" +a.orderDate);
                //     console.log("Second Date: "+b.orderDate);
                //     console.log("Minus:" +(b.orderDate - a.orderDate));
                //     return b.orderDate - a.orderDate; 
                // });
                console.log("Loaded Room Orders:" +JSON.stringify(loadedRoomOrders));
        dispatch({type: FETCH_ROOM_ORDERS, roomOrders: loadedRoomOrders});       
    } catch(err) {
        throw err;
    }
    };
}

export const updateRoomOrder = (order_id, status) => {
    return async (dispatch,getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;   
        const response = await fetch (  
        `https://crpapp-default-rtdb.firebaseio.com/roomOrders/${order_id}.json`,
        {
            method: 'PATCH',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                status
            })
        }
    );
    if(!response.ok) {
        throw new Error('Something went wrong');
    }

    const resData = await response.json();
    console.log('Updated Response Data'+ JSON.stringify(resData));
    dispatch({
        type: status,
        data: {
            id: order_id,
            status
        }
    });
}
}

export const fetchOrders = () => {
    return async (dispatch,getState) => {
        const userId = getState().auth.userId;
        const token = getState().auth.token;
        console.log(getState());
        try {
            const response = await fetch(
                `https://crpapp-default-rtdb.firebaseio.com/orders.json?orderBy="userId"&equalTo="${userId}"&auth=${token}`
            );

            // if(!response.ok) {  
            //     throw new Error('Something went wrong'+JSON.stringify(response));
            // }

            const resData = await response.json();
            console.log("Fetched Orders:" +JSON.stringify(resData));
            const loadedOrders = [];
    
                for( const key in resData) {
                    let order = new Order(
                        resData[key].name, 
                        resData[key].phone, 
                        resData[key].userId
                    );
                        order.id = key;
                        order.items = resData[key].cartItems;
                        order.data = resData[key].orderData;
                        order.totalAmount = resData[key].totalAmount;
                        order.createdDate = new Date(resData[key].date);
                        order.status = resData[key].status;
                    loadedOrders.push( order );           
                }
                // loadedOrders.sort((a,b) => {
                //     console.log("First Date:" +a.orderDate);
                //     console.log("Second Date: "+b.orderDate);
                //     console.log("Minus:" +(b.orderDate - a.orderDate));
                //     return b.orderDate - a.orderDate; 
                // });
                console.log("Loaded Orders:" +JSON.stringify(loadedOrders));
        dispatch({type: SET_ORDERS, orders: loadedOrders});       
    } catch(err) {
        throw err;
    }
    };
};

export const addDetails = (orderData) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        dispatch({
            type: ADD_ADDRESS,
            orderDetails: {
                orderData,
                userId: userId
            }
        });
    }
}

export const addAddress = (orderData) => {
    console.log(JSON.stringify(orderData));
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        dispatch({
            type: ADD_DETAILS,
            orderDetails: {
                orderData,
                userId: userId
            }
        });
    }
}

export const addOrder = (cartItems, totalAmount,orderDetails) => {
    return async (dispatch,getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const createdDate = new Date();
        const order = {
            cartItems,
            totalAmount,
            status: 'Order Placed',
            ...orderDetails,
            createdDate
        };
        const response = await fetch(
            `https://crpapp-default-rtdb.firebaseio.com/orders.json?auth=${token}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    order
                )
            }
        );
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        const resData = await response.json();
        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: resData.name,
                ...order
            }
        });
        const headers = {
            'Authorization': 'Basic ' + base64.encode("rzp_live_jQ5jvvQyL9efRf" + ":" + "wzFY27Fb949quJyTXMGZ8OVo"),
            'Content-Type': 'application/json'
        }
        const response_checkout = await fetch(
            "http://localhost:3001/checkout",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: totalAmount,
                    currency: "INR",
                    receipt: resData.name,
                })
            }
        );
        const payment_response = await response_checkout.json();
        dispatch({
            type: PAYMENT_INITIATED,
            data: {
                id: payment_response.id,
                amount: payment_response.amount,
                receipt_id: payment_response.receipt
            }
        });
    }
}

export const update_order = (order_id, order_details, status) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(
            `https://crpapp-default-rtdb.firebaseio.com/orders/${order_id}.json?auth=${token}`,
            {
                method: 'PATCH',
                headers: {  
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...order_details
                })
            }
        );
        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        const resData = await response.json();
        dispatch({
            type: status,
            data: {
                id: order_id,
                ...order_details
            }
        });
    }
}