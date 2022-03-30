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
                `https://crpapp-default-rtdb.firebaseio.com/orders.json`
            );

            // if(!response.ok) {  
            //     throw new Error('Something went wrong'+JSON.stringify(response));
            // }

            const resData = await response.json();
            console.log("Fetched Orders:" +JSON.stringify(resData));
            const loadedOrders = [];
    
                for( const key in resData) {
                    let order = new Order(
                        key,
                        resData[key].cartItems, 
                        resData[key].totalAmount,
                        resData[key].createdDate,
                        resData[key].date,
                        resData[key].status,
                        resData[key].name,
                        resData[key].phone,
                        resData[key].email,
                        resData[key].time,
                    );
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

export const addDetails = (name,phone,email,date) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const details = { name, phone, email, date };
        dispatch({
            type: ADD_DETAILS,
            orderDetails: {details}
        });
        console.log(details);
    }
}

export const addAddress = (orderData) => {
    console.log(JSON.stringify(orderData));
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

export const addOrder = (cartItems, totalAmount, name, phone, email, date, time, dobDate, domDate) => {
    return async (dispatch,getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const createdDate = new Date();
        const order = {
            cartItems,
            totalAmount,
            name,
            phone,
            email,
            date,
            time,
            dobDate,
            domDate,
            status: 'Order Placed',
            createdDate
        };
        const response = await fetch(
            `https://crpapp-default-rtdb.firebaseio.com/orders.json`,
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
        const response_checkout = await fetch(
            "https://us-central1-crpapp.cloudfunctions.net/checkout",
            {
                method: 'POST',
                mode: 'no-cors',
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
            `https://crpapp-default-rtdb.firebaseio.com/orders/${order_id}.json`,
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

export const acknowledgeOrder = (orderId, status) => {
    return async (dispatch) => {
        const response = await fetch(
            `https://crpapp-default-rtdb.firebaseio.com/orders/${orderId}.json`,
            {
                method: 'PATCH',
                headers: {  
                    'Content-Type': 'application/json'
            },
                body: JSON.stringify({
                    status
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
                id: orderId,
                status
            }
        });
    }
}