import Details from "../models/details"
import Order from "../models/order"
import shootOrder from "../models/shootOrder"
import { ADD_ADDRESS, ADD_DETAILS, ADD_ORDER, ADD_SHOOT_ORDERS, FETCH_ROOM_ORDERS, PAYMENT_FAILED, PAYMENT_INITIATED, SET_ORDERS } from "./orderAction"

const initialState = {
    orders: [],
    roomOrders: [],
    current_details: {},
    razorpay_order_details: {},
    shootOrders: []
}

export default (state = initialState, action) => {
    switch (action.type) { 
        case ADD_SHOOT_ORDERS :
            const newShootOrder = new shootOrder(
                action.shootOrderData.id,
                action.shootOrderData.shootTypeId,
                action.shootOrderData.shootType,
                action.shootOrderData.price,
                action.shootOrderData.picCount,
                action.shootOrderData.name,
                action.shootOrderData.phone,
                action.shootOrderData.status,
                action.shootOrderData.createdDate,
                action.shootOrderData.userId
            )
            return { 
                ...state,
                shootOrders: newShootOrder
            }
        case FETCH_ROOM_ORDERS:
            return {
                roomOrders: action.roomOrders
            }
        case SET_ORDERS: 
            return {
                ...state,
                orders: action.orders
            };
        case ADD_DETAILS:
            console.log(action.orderDetails);
            // const newDetails = new Details (
            //     action.orderDetails.name,
            //     action.orderDetails.phone,
            //     action.orderDetails.email,
            //     action.orderDetails.date
            // )
            const newDetails = {
                ...action.orderDetails
            }
            return {
                ...state,
                current_details: newDetails
            };
        case ADD_ADDRESS:
            const newAddress = {
                ...action.orderDetails
            }
            return {
                ...state,
                current_details: newAddress
            }
        case ADD_ORDER:
            const newOrder = new Order(
                action.orderData.id,
                action.orderData.items,
                action.orderData.amount,
                action.orderData.createdDate
            );
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            };
        case PAYMENT_INITIATED:
            return {
                ...state,
                razorpay_order_details: {
                    id: action.data.id,
                    amount: action.data.amount,
                    receipt_id: action.data.receipt_id
                }
            }
        case PAYMENT_FAILED:
            return {
                ...state
            }
        default:
            return state;
    }
}