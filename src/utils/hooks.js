import createReducer from "../reducers";


function injectAsyncReducer(store) {
    return (name, asyncReducer) => {
        if (store.asyncReducers[name]) return;
        store.asyncReducers[name] = asyncReducer;
        store.replaceReducer(createReducer(store.asyncReducers));
    }
}

function injectAsyncSagas(store) {
    return (name, asyncSagas) => {
        if (store.asyncSagas[name]) return;
        store.asyncSagas[name] = asyncSagas;
        if (Array.isArray(asyncSagas)) asyncSagas.map(store.runSaga) 
        store.runSaga(asyncSagas);
    }
}

function loadModule(cb) {
    return (componentModule) => {
        cb(null, componentModule.default);
    }
}

function errorLoading(err) {
    console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
    window.location.reload(true);
};


export function getHooks(store) {
    return {
        injectReducer: injectAsyncReducer,
        injectSagas: injectAsyncSagas,
        loadModule,
        errorLoading,
    }
}