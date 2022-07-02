import { Dispatch } from "redux";
import { privateHttp } from "../../baseUrl";
import {ErrorPopUp, SuccessPopUp} from "../../utils/toastify";
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
} from "./actionTypes";

const getOrdersStarted = () => ({
    type: GET_ORDERS_STARTED
})

const getOrdersSuccess = (data: IOrder) => ({
    type: GET_ORDERS_SUCCESSFUL,
    payload: data
})

const getOrdersFailed = (data: any) => ({
    type: GET_ORDERS_FAILED,
    payload: data
})

const getOrderStarted = () => ({
    type: GET_ORDER_STARTED
})

const getOrderSuccess = (data: IOrder) => ({
    type: GET_ORDER_SUCCESSFUL,
    payload: data
})

const getOrderFailed = (data: any) => ({
    type: GET_ORDER_FAILED,
    payload: data
})

const updateOrderStart = () => ({
    type: UPDATE_ORDER_STARTED
})

const updateOrderSuccess = (data: IOrder) => ({
    type: UPDATE_ORDER_SUCCESSFUL,
    payload: data
})

const updateOrderFailed = (data: any) => ({
    type: UPDATE_ORDER_FAILED,
    payload: data
})

export const getOrder = (id: any) => async (dispatch: Dispatch) => {
    try {
        dispatch(getOrderStarted())
        const response = await privateHttp({
            method: "get",
            url: `/store/orders/order/?_id=${id}`
        })
        const { data } = response;
        return dispatch(getOrderSuccess(data))
    } catch (error: any) {
        return dispatch(getOrderFailed(error.response))
    }
}

export const getOrders = () => async (dispatch: Dispatch) => {
    try {
        dispatch(getOrdersStarted())
        const response = await privateHttp({
            method: "get",
            url: `/store/orders/`
        })
        const { data } = response;
        return dispatch(getOrdersSuccess(data))
    } catch (error: any) {
        return dispatch(getOrdersFailed(error.response))
    }
}


export const updateOrder = (payload: any) => async (dispatch: Dispatch) => {
    try {
      dispatch(updateOrderStart());
      const response = await privateHttp({
        method: "patch",
        url: `/store/orders/order/update/`,
        data: payload
      });
      const { data } = response;
      SuccessPopUp("Order Updated Successfully")
      return dispatch(updateOrderSuccess(data.data));
    } catch (error: any) {
      ErrorPopUp(error.response.data.message)
      return dispatch(updateOrderFailed(error.response));
    }
  };