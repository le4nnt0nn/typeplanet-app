import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducerRoot from '../reducers';

const persistConfig = {
    key: 'persist-key',
    storage
}

const initialState = {};

// middleware with async logic for store
const middleware = [thunk];

const persistedReducer = persistReducer(persistConfig, reducerRoot)
const store = createStore (
    persistedReducer,
    initialState,
    // apply middleware for store
    composeWithDevTools(applyMiddleware(...middleware))
);
const persistor = persistStore(store)

export default store;
export {persistor};