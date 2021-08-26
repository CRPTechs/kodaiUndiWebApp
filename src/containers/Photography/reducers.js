import { FETCH_PHOTOGRAPHY } from './actions';

const initialState = {
    fetchedPhotography: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PHOTOGRAPHY:
            return {
                ...state,
                fetchedPhotography: action.photography
            }
        default:
            return state;
    }
}