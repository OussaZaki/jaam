import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import middlewares from './middlewares';
import rootReducer from './reducer';

const persistConfig = {
  key: "root",
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

// rehydrate state on app start, or load from cache
const preloadedState = {};

// add
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create store
export default () => {
  const store = createStore(persistedReducer, preloadedState, composeEnhancers(
    applyMiddleware(...middlewares)
  ));
  const persistor = persistStore(store)
  return { store, persistor }
}
