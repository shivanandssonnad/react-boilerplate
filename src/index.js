import React from 'react';
import ReactDOM from 'react-dom';

import {
  Router,
  browserHistory,
} from 'react-router';

import {
  syncHistoryWithStore,
} from 'react-router-redux';

import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import configureStore from './store';
import { createRootRoute } from './routes';
import GlobalSelectors from './selectors';

const store = configureStore({}, browserHistory);

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: GlobalSelectors.selectLocationState(),
});

const rootRoute = createRootRoute(store);

ReactDOM.render(
  <Provider store={store}>
    <Router 
      history={history}
      routes={rootRoute}
    />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
