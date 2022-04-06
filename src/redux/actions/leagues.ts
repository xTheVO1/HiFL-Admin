import { Dispatch } from "redux";
import {
    GET_LEAGUES_STARTED,
    GET_LEAGUES_SUCCESSFUL,
    GET_LEAGUES_FAILED,
    GET_LEAGUE_STARTED,
    GET_LEAGUE_SUCCESSFUL,
    GET_LEAGUE_FAILED,
    POST_LEAGUE_STARTED,
    POST_LEAGUE_SUCCESSFUL,
    POST_LEAGUE_FAILED
} from "./actionTypes";
import {privateHttp} from "../../baseUrl";

const getleaguesStarted = () => ({
    type: GET_LEAGUES_STARTED
  })

const getleaguesSuccess = (data: ILeague) => ({
    type: GET_LEAGUES_SUCCESSFUL,
    payload: data
  })

const getleaguesFailed = (data: any) => ({
    type: GET_LEAGUES_FAILED,
    payload: data
  })

  const getleagueStarted = () => ({
    type: GET_LEAGUE_STARTED
  })

const getleagueSuccess = (data: ILeague) => ({
    type: GET_LEAGUE_SUCCESSFUL,
    payload: data
  })

const getleagueFailed = (data: any) => ({
    type: GET_LEAGUE_FAILED,
    payload: data
  })

const postleagueStarted = () => ({
  type: POST_LEAGUE_STARTED
})

const postleagueSuccess = (data: ISeason) => ({
    type: POST_LEAGUE_SUCCESSFUL,
    payload: data
  })

const postleagueFailed = (data: any) => ({
    type: POST_LEAGUE_FAILED,
    payload: data
  })
export const getleagues = () => async (dispatch: Dispatch) => {
   try {
       dispatch(getleaguesStarted())
       const response = await privateHttp({
         method: "get",
         url: `/leagues/`
       })
       const { data } = response;
       return dispatch(getleaguesSuccess(data.data))
     } catch (error: any) {
       return dispatch(getleaguesFailed(error.response))
     }
  }

export const getleague = () => async (dispatch: Dispatch) => {
    try {
        dispatch(getleagueStarted())
        const response = await privateHttp({
          method: "get",
          url: `/leagues/league/`
        })
        const { data } = response;
        return dispatch(getleagueSuccess(data.data))
      } catch (error: any) {
        return dispatch(getleagueFailed(error.response))
      }
  }

  export const postLeague = (payload: any) => async (dispatch: Dispatch) => {
    try {
        dispatch(postleagueStarted())
        const response = await privateHttp({
          method: "post",
          url: `/leagues/create/`,
          data: payload
        })
        const { data } = response;
        return dispatch(postleagueSuccess(data))
      } catch (error: any) {
        return dispatch(postleagueFailed(error.response))
      }
  }