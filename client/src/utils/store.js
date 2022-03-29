import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducerRoot from '../reducers';

const initialState = {};

// middleware with async logic for store
const middleware = [thunk];

const store = createStore (
    reducerRoot,
    initialState,
    // apply middleware for store
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;