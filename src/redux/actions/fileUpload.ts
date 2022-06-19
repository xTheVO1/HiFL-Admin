import { Dispatch } from "redux";
import {
  POST_FILE_STARTED,
  POST_FILE_SUCCESSFUL,
  POST_FILE_FAILED
} from "./actionTypes";
import { privateHttp } from "../../baseUrl";
import { ErrorPopUp, SuccessPopUp } from "../../utils/toastify";

const postFileStarted = () => ({
  type: POST_FILE_STARTED
})

const postFileSuccess = (data: ISeason) => ({
  type: POST_FILE_SUCCESSFUL,
  payload: data
})

const postFileFailed = (data: any) => ({
  type: POST_FILE_FAILED,
  payload: data
})

export const postFile = (payload: any) => async (dispatch: Dispatch) => {
  try {
    dispatch(postFileStarted())
    const headers = {
      "Authorization": `Bearer-Jwt ${sessionStorage.getItem('token')}`,
      "Content-Type": "multipart/formdata"
    }
    const response = await privateHttp({
      method: "post",
      url: '/players/player/docuploads/',
      headers: headers,
      data: payload,
    })
    const { data } = response;
    SuccessPopUp("File uploaded Successfully");
    return dispatch(postFileSuccess(data.data))
  } catch (error: any) {
    ErrorPopUp(error.response.data.message)
    return dispatch(postFileFailed(error.response))
  }
}

export const postFiles = (payload: any) => async (dispatch: Dispatch) => {
  console.log(payload)
  try {
    dispatch(postFileStarted())
    const headers = {
      "Authorization": `Bearer-Jwt ${sessionStorage.getItem('token')}`,
      "Content-Type": "multipart/formdata"
    }
    
    const response = await privateHttp({
      method: "post",
      url: '/file/upload/',
      headers: headers,
      data: payload,
    })
    const { data } = response;
    console.log(data)
    SuccessPopUp("File uploaded Successfully");
    return dispatch(postFileSuccess(data.data))
  } catch (error: any) {
    ErrorPopUp(error.response.data.message)
    return dispatch(postFileFailed(error.response))
  }
}

export const postOffcialFile = (payload: any) => async (dispatch: Dispatch) => {
  try {
    dispatch(postFileStarted())
    const headers = {
      "Authorization": `Bearer-Jwt ${sessionStorage.getItem('token')}`,
      "Content-Type": "multipart/formdata"
    }
    const response = await privateHttp({
      method: "post",
      url: '/officials/official/docuploads/',
      headers: headers,
      data: payload,
    })
    const { data } = response;
    SuccessPopUp("File uploaded Successfully");
    return dispatch(postFileSuccess(data.data))
  } catch (error: any) {
    ErrorPopUp(error.response.data.message)
    return dispatch(postFileFailed(error.response))
  }
}
