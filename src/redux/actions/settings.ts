import { Dispatch } from "redux";

import {
GET_SETTING_STARTED,
GET_SETTING_SUCCESSFUL,
GET_SETTING_FAILED,
POST_SETTING_STARTED,
POST_SETTING_SUCCESSFUL,
POST_SETTING_FAILED,
UPDATE_SETTING_STARTED,
UPDATE_SETTING_SUCCESSFUL,
UPDATE_SETTING_FAILED,
SET_SELECTED_SETTING,
GET_SET_SELECTED_SETTING
} from "./actionTypes";

import {privateHttp} from "../../baseUrl";
import { ErrorPopUp, SuccessPopUp } from "../../utils/toastify";

const getSettingStarted = () => ({
    type: GET_SETTING_STARTED
  })

const getSettingSuccess = (data: ISeason) => ({
    type: GET_SETTING_SUCCESSFUL,
    payload: data
  })

const getSettingFailed = (data: any) => ({
    type: GET_SETTING_FAILED,
    payload: data
  })

  const postSettingStarted = () => ({
    type: POST_SETTING_STARTED
  })

const postSettingSuccess = (data: ISeason) => ({
    type: POST_SETTING_SUCCESSFUL,
    payload: data
  })

const postSettingFailed = (data: any) => ({
    type: POST_SETTING_FAILED,
    payload: data
  })

const updateSettingStarted = () => ({
    type: UPDATE_SETTING_STARTED
  })

const updateSettingSuccess = (data: ISeason) => ({
    type: UPDATE_SETTING_SUCCESSFUL,
    payload: data
  })

const updateSettingFailed = (data: any) => ({
    type: UPDATE_SETTING_FAILED,
    payload: data
  })

  const setSettingSuccess = (data: ISetting) => ({
    type: SET_SELECTED_SETTING,
    payload: data
  })

  const getSetSettingSuccess = (data: ISetting) => ({
    type: GET_SET_SELECTED_SETTING,
    payload: data
  })

export const getSettings = () => async (dispatch: Dispatch) => {
try {
    dispatch(getSettingStarted())
    const response = await privateHttp({
        method: "get",
        url: `/settings/`
    })
    const { data } = response;
    return dispatch(getSettingSuccess(data))
    } catch (error: any) {
    return dispatch(getSettingFailed(error.response))
    }
}

export const postSettings = (payload: any) => async (dispatch: Dispatch) => {
  try {
        dispatch(postSettingStarted())
        const response = await privateHttp({
          method: "post",
          url: `/settings/`,
          data: payload
        })
        const { data } = response;
        SuccessPopUp("League Successfully Created")
        return dispatch(postSettingSuccess(data))
      } catch (error: any) {
        ErrorPopUp(error.response.data.message)
        return dispatch(postSettingFailed(error.response))
      }
}

export const updateSettings = (payload:any) => async (dispatch: Dispatch) => {
    try {    
        dispatch(updateSettingStarted())
        const response = await privateHttp({
          method: "post",
          url: `/settings/update/`,
          data: payload
        })
        const { data } = response;
        return dispatch(updateSettingSuccess(data))
      } catch (error: any) {
        return dispatch(updateSettingFailed(error.response))
      }
}

export const selectedItem = (item: any) => async (dispatch: Dispatch) =>{
  sessionStorage.setItem('selectedData', JSON.stringify(item));
  dispatch(setSettingSuccess(item))
}

export const getSelectedItem = () => async (dispatch: Dispatch) =>{
  const data: any = sessionStorage.getItem("selectedData");
  const setting = JSON.parse(data);
  dispatch(getSetSettingSuccess(setting))
}