import { createStore, applyMiddleware, compose } from "redux"
import reducer from "./reducers/index";
import thunk from "redux-thunk";
import logger from 'redux-logger';
import createDebounce from 'redux-debounced';
import {loadState, saveState} from "../utils/localstorage"
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
    }
}

// ** init middleware
const middleware = [thunk, createDebounce(), logger]

// ** Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const storeEnhancer =  composeEnhancers(applyMiddleware(...middleware))

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