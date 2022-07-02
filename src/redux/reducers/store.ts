import {
    GET_ORDERS_STARTED,
    GET_ORDERS_SUCCESSFUL,
    GET_ORDERS_FAILED,
    GET_ORDER_STARTED,
    GET_ORDER_SUCCESSFUL,
    GET_ORDER_FAILED,
    UPDATE_ORDER_STARTED,
    UPDATE_ORDER_SUCCESSFUL,
    UPDATE_ORDER_FAILED,
} from "../actions/actionTypes";

const initialState = {
orders: [],
  order: {},
  updatedOrder:{},
  newOrder: {},
  loading: false,
  error: {},
  updateLoading:false
}
export const StoreReducer = (state: OrderState = initialState, action: any): OrderState => {
    switch(action.type) {
      case  GET_ORDERS_STARTED:
        return {
          ...state,
          loading: true
        }
      case GET_ORDERS_SUCCESSFUL: 
        return {
          ...state,
          loading: false,
          orders: action.payload
        }
      case GET_ORDERS_FAILED:
        return {
          ...state,
          loading: false,
          error: action.payload
        }
        case  GET_ORDER_STARTED:
          return {
            ...state,
            loading: true
          }
        case GET_ORDER_SUCCESSFUL: 
          return {
            ...state,
            loading: false,
            order: action.payload
          }
        case GET_ORDER_FAILED:
          return {
            ...state,
            loading: false,
            error: action.payload
          }
          case  UPDATE_ORDER_STARTED:
            return {
              ...state,
              updateLoading: true
            }
          case UPDATE_ORDER_SUCCESSFUL: 
            return {
              ...state,
              updateLoading: false,
              updatedOrder: action.payload
            }
          case UPDATE_ORDER_FAILED:
            return {
              ...state,
              updateLoading: false,
              error: action.payload
            }
    }
      return state;
}