import { combineReducers } from 'redux-immutable';
import { fromJS } from "immutable";
import { LOCATION_CHANGE } from "react-router-redux";

function globalReducer(state = {}, action) {
    switch(action.type) {
    default: return state; 
    }
}

// Initial routing state
const routeInitialState = fromJS({
    locationBeforeTransitions: null,
});


/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
    switch (action.type) {
          /* istanbul ignore next */
    case LOCATION_CHANGE:
        return state.merge({
            locationBeforeTransitions: action.payload,
        });
    default:
        return state;
    }
}

export default function createReducer(asyncReducers = {}) {
    return combineReducers({
        global: globalReducer,
        route: routeReducer,
        ...asyncReducers,
    });
}
