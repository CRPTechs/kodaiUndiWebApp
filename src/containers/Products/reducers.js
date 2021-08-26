import { SET_PRODUCTS } from "./actions";

const initialState = {
    availableProducts: []
}

export default (state=initialState, action) => {
    switch(action.type) {
        case SET_PRODUCTS: 
            return {
                ...state,
                availableProducts: action.products
            }
        default: {
            return state;
        }
    }
}