import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';

import createReducer from "./reducers";
import { routerMiddleware } from "react-router-redux";
import { fromJS } from "immutable";

import createReducers from './reducers';

const sagaMiddleware = createSagaMiddleware();
const devtoolsExt = window.__REDUX_DEVTOOLS_EXTENSION__ || (() => noop => noop);
const devTools = process.env.NODE_ENV === 'development' ? devtoolsExt : (() => noop => noop);

export default function configureStore(initialState, history) {
    const middlewares = [
        sagaMiddleware,
        routerMiddleware(history),
    ];

    const enhancers = [
        applyMiddleware(...middlewares),
        devTools(),
    ];

    const store = createStore(
        createReducer(createReducers({})),
        fromJS(initialState),
        compose(...enhancers)
    );

    store.asyncSagas = {};
    store.asyncReducers = {};
    return store;
}