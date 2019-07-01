import { createStore, applyMiddleware, compose } from 'redux';

import middlewares from './middlewares';
import rootReducer from './reducer';

// rehydrate state on app start, or load from cache
const preloadedState = {};

// add
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create store
const store = createStore(rootReducer, preloadedState, composeEnhancers(
  applyMiddleware(...middlewares)
));


// export store singleton instance
export default store;
