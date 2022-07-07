import { Dispatch } from "redux";
import {
  GET_USERS_START,
  GET_USERS_SUCCESSFUL,
  GET_USERS_FAILED,
  GET_USER_START,
  GET_USER_SUCCESSFUL,
  GET_USER_FAILED,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESSFUL,
  UPDATE_USER_FAILED
  } from "./actionTypes";

  import { privateHttp } from "../../baseUrl";
  import {ErrorPopUp, SuccessPopUp} from "../../utils/toastify";

  const start = () => ({
    type: GET_USERS_START,
  });
  
  const getUsersSuccess = (data: IUser) => ({
    type: GET_USERS_SUCCESSFUL,
    payload: data,
  });
  
  const getUsersFailed = (data: any) => ({
    type: GET_USERS_FAILED,
    payload: data,
  });

  const getUserStart = () => ({
    type: GET_USER_START,
  });
  
  const getUserSuccess = (data: IUser) => ({
    type: GET_USER_SUCCESSFUL,
    payload: data,
  });
  
  const getUserFailed = (data: any) => ({
    type: GET_USER_FAILED,
    payload: data,
  });

  const editUserStart = () => ({
    type: UPDATE_USER_START,
  });
  
  const editUserSuccess = (data: IUser) => ({
    type: UPDATE_USER_SUCCESSFUL,
    payload: data,
  });
  
  const editUserFailed = (data: any) => ({
    type: UPDATE_USER_FAILED,
    payload: data,
  });

  export const getUsers = () => async (dispatch: Dispatch) => {
    try {
      dispatch(start());
      const response = await privateHttp({
        method: "get",
        url: `/auth/users/`,
      });
      const { data } = response;
      return dispatch(getUsersSuccess(data.data));
    } catch (error: any) {
      ErrorPopUp(error.response.data.message)
      return dispatch(getUsersFailed(error.response));
    }
  };

  export const getUser = (id:any) => async (dispatch: Dispatch) => {
    try {
      dispatch(getUserStart());
      const response = await privateHttp({
        method: "get",
        url: `/auth/find/?Email=${id}`,
      });
      const { data } = response;
      return dispatch(getUserSuccess(data));
    } catch (error: any) {
      ErrorPopUp(error.response.data.message)
      return dispatch(getUserFailed(error.response));
    }
  };

  export const updateUser = (payload: any) => async (dispatch: Dispatch) => {
    try {
      dispatch(editUserStart());
      const response = await privateHttp({
        method: "patch",
        url: `/auth/user/update-profile/`,
        data: payload
      });
      const { data } = response;
      SuccessPopUp("User Updated Successfully")
      return dispatch(editUserSuccess(data.data));
    } catch (error: any) {
      ErrorPopUp(error.response.data.message)
      return dispatch(editUserFailed(error.response));
    }
  };
  