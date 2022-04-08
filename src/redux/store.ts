import { createStore, applyMiddleware, compose } from "redux"
import reducer from "./reducers/index";
import thunk from "redux-thunk";
import logger from 'redux-logger';
import createDebounce from 'redux-debounced';
import {loadState, saveState} from "../utils/localstorage"
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION__?: any;
    }
}

// ** init middleware
const enhancers = [];
const middleware:any = [thunk, createDebounce(), logger]

if (process.env.NODE_ENV === 'development') {
/* eslint-disable import/no-extraneous-dependencies, global-require */
const logger = require('redux-logger').default;
middleware.push(logger);

const { __REDUX_DEVTOOLS_EXTENSION__ } = window;

if (typeof __REDUX_DEVTOOLS_EXTENSION__ === 'function') {
  enhancers.push(__REDUX_DEVTOOLS_EXTENSION__());
}
}


// ** Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose

const storeEnhancer =  composeEnhancers(applyMiddleware(...middleware), ...enhancers)

const giveStore = () => {
  const persistedState = loadState();
  const store = createStore(
    reducer,
    persistedState,
    storeEnhancer
  );

   //user contains the TOKEN
   store.subscribe(() => {
    saveState({
      auth: store.getState().auth,
    });
  });
  return store;
};

export default giveStore;