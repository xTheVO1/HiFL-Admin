import { createStore, applyMiddleware, compose } from "redux"
import reducer from "./reducers/index";
import thunk from "redux-thunk";
import logger from 'redux-logger';
import createDebounce from 'redux-debounced';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
    }
}

// ** init middleware
const middleware = [thunk, createDebounce(), logger]

// ** Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, {}, composeEnhancers(applyMiddleware(...middleware)))


// const store = 
// createStore(reducer, applyMiddleware(thunk));

export default store;