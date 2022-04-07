import { Dispatch } from "redux";
import {
    LOGIN_FAILED, 
    LOGIN_START, 
    LOGIN_SUCCESSFUL
} from "./actionTypes"
import {http} from "../../baseUrl";


const start = () => ({
    type: LOGIN_START
  })

const loginSuccess = (data: IUser) => ({
    type: LOGIN_SUCCESSFUL,
    payload: data
  })

const loginFailed = (data: any) => ({
    type: LOGIN_FAILED,
    payload: data
  })

export const signIn = (data: any) => async (dispatch: Dispatch) => {
   const {user, history} = data;
  try {
      dispatch(start())
      const response = await http({
        method: "post",
        url: `/auth/login`,
        data: user
      })
      const { data } = response;
      sessionStorage.setItem('token', data.data.accessToken);
      sessionStorage.setItem('userData', JSON.stringify(data.data.User));
        history("/dashboard")
      return dispatch(loginSuccess(response.data.data))
    } catch (error: any) {
      return dispatch(loginFailed(error.response))
    }
  }