import Cart from "../models/cart";
import { ADD_TO_CART, REMOVE_FROM_CART } from "./cartAction"


const initialState = {  
    items: {},
    totalAmount: 0,
    building: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedItem = action.item;
            const itemPrice = addedItem.price;
            const itemTitle = addedItem.title;
            const itemWeight = addedItem.weight;
            let updatedOrNewCartItem;

            if (state.items[addedItem.id]) {
                updatedOrNewCartItem = new Cart(
                    state.items[addedItem.id].quantity + 1,
                    itemPrice,
                    itemTitle,
                    state.items[addedItem.id].sum + itemPrice,
                    itemWeight
                );
            } else {
                updatedOrNewCartItem = new Cart(1, itemPrice, itemTitle, itemPrice, itemWeight);
            }
            return {
                ...state,
                items: { ...state.items, [addedItem.id]: updatedOrNewCartItem },
                totalAmount: state.totalAmount + itemPrice,
                building: true
            };
        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.pid];
            const currentQty = selectedCartItem.quantity;
            let updatedCartItems;
            if (currentQty > 1) {
                const updatedCartItem = new Cart(selectedCartItem.quantity - 1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice);
                updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
            } else {
                updatedCartItems = { ...state.items };
                delete updatedCartItems[action.pid];
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice,
                building: true
            };
        default:
            return state;
    }
}