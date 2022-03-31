import { Dispatch } from "redux";
import {
    GET_SEASONS_STARTED,
    GET_SEASONS_SUCCESSFUL,
    GET_SEASONS_FAILED,
    GET_SEASON_STARTED,
    GET_SEASON_SUCCESSFUL,
    GET_SEASON_FAILED,
    POST_SEASON_STARTED,
    POST_SEASON_SUCCESSFUL,
    POST_SEASON_FAILED
    
} from "./actionTypes";
import {privateHttp} from "../../baseUrl";

const getSeasonsStarted = () => ({
    type: GET_SEASONS_STARTED
  })

const getSeasonsSuccess = (data: ISeason) => ({
    type: GET_SEASONS_SUCCESSFUL,
    payload: data
  })

const getSeasonsFailed = (data: any) => ({
    type: GET_SEASONS_FAILED,
    payload: data
  })

const getSeasonStarted = () => ({
    type: GET_SEASON_STARTED
  })

const getSeasonSuccess = (data: ISeason) => ({
    type: GET_SEASON_SUCCESSFUL,
    payload: data
  })

const getSeasonFailed = (data: any) => ({
    type: GET_SEASON_FAILED,
    payload: data
  })

const postSeasonStarted = () => ({
    type: POST_SEASON_STARTED
  })

const postSeasonSuccess = (data: ISeason) => ({
    type: POST_SEASON_SUCCESSFUL,
    payload: data
  })

const postSeasonFailed = (data: any) => ({
    type: POST_SEASON_FAILED,
    payload: data
  })
export const getSeasons = () => async (dispatch: Dispatch) => {
   try {
       dispatch(getSeasonsStarted())
       const response = await privateHttp({
         method: "get",
         url: `/seasons/`
       })
       const { data } = response;
       return dispatch(getSeasonsSuccess(data))
     } catch (error: any) {
       return dispatch(getSeasonsFailed(error.response))
     }
  }

export const getSeason = () => async (dispatch: Dispatch) => {
    try {
        dispatch(getSeasonStarted())
        const response = await privateHttp({
          method: "get",
          url: `/seansons/season/`
        })
        const { data } = response;
        return dispatch(getSeasonSuccess(data.data))
      } catch (error: any) {
        return dispatch(getSeasonFailed(error.response))
      }
  }

export const postSeason = (payload: any) => async (dispatch: Dispatch) => {
  try {
      dispatch(postSeasonStarted())
      const response = await privateHttp({
        method: "get",
        url: `/seasons/season/`,
        data: payload
      })
      const { data } = response;
      return dispatch(postSeasonSuccess(data))
    } catch (error: any) {
      return dispatch(postSeasonFailed(error.response))
    }
}