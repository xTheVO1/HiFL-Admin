import { Dispatch } from "redux";

import {
GET_SPORT_STARTED,
GET_SPORT_SUCCESSFUL,
GET_SPORT_FAILED
} from "./actionTypes";

import {privateHttp} from "../../baseUrl";

const getSportsStarted = () => ({
    type: GET_SPORT_STARTED
  })

const getSportsSuccess = (data: ILeague) => ({
    type: GET_SPORT_SUCCESSFUL,
    payload: data
  })

const getSportsFailed = (data: any) => ({
    type: GET_SPORT_FAILED,
    payload: data
  })

  export const getSports = () => async (dispatch: Dispatch) => {
    try {
        dispatch(getSportsStarted())
        const response = await privateHttp({
          method: "get",
          url: `/sports/`
        })
        const { data } = response;
        return dispatch(getSportsSuccess(data.data))
      } catch (error: any) {
        return dispatch(getSportsFailed(error.response))
      }
  }