import { SET_ITEMS, EDIT_ITEMS } from './actions';

const initialState = {
    availableCategories: [],
    availableItems: [],
    editItems: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_ITEMS:
            let allCategories = action.items.map(item => item.category);
            let categories = [];
            for(let i = 0; i<allCategories.length; i++) {
                if(!categories.includes(allCategories[i])){
                    categories.push(allCategories[i]);
                }
            }
            return {
                ...state,
                availableItems: action.items,
                availableCategories: categories
            };
        case EDIT_ITEMS:
                return {
                    ...state,
                    editItems: action.editItems
                }
        default:
            return state;
    }
}