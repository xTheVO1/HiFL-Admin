import { Dispatch } from "redux";
import {
  POST_FILE_STARTED,
  POST_FILE_SUCCESSFUL,
  POST_FILE_FAILED
} from "./actionTypes";
import { privateHttp } from "../../baseUrl";

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
      url: '/file/uploader/',
      headers: headers,
      data: payload,
    })
    const { data } = response;
    console.log(data)
    return dispatch(postFileSuccess(data))
  } catch (error: any) {
    return dispatch(postFileFailed(error.response))
  }
}
