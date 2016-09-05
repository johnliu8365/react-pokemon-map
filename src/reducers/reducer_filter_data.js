import { SET_SELECT_ID, SET_MAP_LEVEL, SET_SEARCH_LOCATION    } from '../actions/index';

const INITIAL_STATE = { selectId: 0, level: 16, latitude: 25.064676, longitude: 121.544358 };

export default function(state = INITIAL_STATE, action ){
    switch(action.type){  
    case SET_SELECT_ID:
        return {...state, selectId:action.payload};
    case SET_MAP_LEVEL:
        return {...state, level:action.payload};
    case SET_SEARCH_LOCATION:
        return {...state, latitude:action.payload.latitude, longitude: action.payload.longitude};

    default:
        return state;
    }
}