// // import { EDIT_ITEMS, FETCH_ACCOMODATION, FETCH_PHOTOGRAPHY, SET_ITEMS, SET_PRODUCTS } from "./itemsAction";

// const initialState = {
//     availableCategories: [],
//     availableItems: [],
//     availableProducts: [],
//     editItems: [],
//     availableAccomodation: [],
//     fetchedPhotography: []
// };

// export default (state = initialState, action) => {
//     switch (action.type) {
//         case FETCH_PHOTOGRAPHY:
//             return {
//                 ...state,
//                 fetchedPhotography: action.photography
//             }
//         case FETCH_ACCOMODATION:
//             return {
//                 ...state,
//                 availableAccomodation: action.accomodation
//             }
//         case SET_ITEMS:
//             let allCategories = action.items.map(item => item.category);
//             let categories = [];
//             for(let i = 0; i<allCategories.length; i++) {
//                 if(!categories.includes(allCategories[i])){
//                     categories.push(allCategories[i]);
//                 }
//             }
//             return {
//                 ...state,
//                 availableItems: action.items,
//                 availableCategories: categories
//             };
//         case EDIT_ITEMS:
//             return {
//                 ...state,
//                 editItems: action.editItems
//             }
//         case SET_PRODUCTS:
//             return {
//                 ...state,
//                 availableProducts: action.products
//             }
//         default:
//             return state;
//     }
// };