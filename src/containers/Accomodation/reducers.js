import { FETCH_ACCOMODATION } from './actions';

const initialState = {
    availableAccomodation: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ACCOMODATION:
            return {
                ...state,
                availableAccomodation: action.accomodation
            }
        default:
            return state;
    }
};