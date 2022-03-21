import { Dispatch } from "redux";
import {
  POST_OFFICIAL_STARTED,
  POST_OFFICIAL_SUCCESSFUL,
  POST_OFFICIAL_FAILED,
  GET_OFFICIAL_STARTED,
  GET_OFFICIAL_SUCCESSFUL,
  GET_OFFICIAL_FAILED,
  GET_OFFICIALS_STARTED,
  GET_OFFICIALS_SUCCESSFUL,
  GET_OFFICIALS_FAILED
} from "./actionTypes";
import { privateHttp, http } from "../../baseUrl";

const start = () => ({
  type: POST_OFFICIAL_STARTED
})

const postOfficialSuccess = (data: ITeam) => ({
  type: POST_OFFICIAL_SUCCESSFUL,
  payload: data
})

const postOfficialFailed = (data: any) => ({
  type: POST_OFFICIAL_FAILED,
  payload: data
})

const getOfficialStarted = () => ({
  type: GET_OFFICIAL_STARTED
})

const getOfficialSuccess = (data: ITeam) => ({
  type: GET_OFFICIAL_SUCCESSFUL,
  payload: data
})

const getOfficialFailed = (data: any) => ({
  type: GET_OFFICIAL_FAILED,
  payload: data
})

const getOfficialsStarted = () => ({
  type: GET_OFFICIALS_STARTED
})

const getOfficialsSuccess = (data: ITeam) => ({
  type: GET_OFFICIALS_SUCCESSFUL,
  payload: data
})

const getOfficialsFailed = (data: any) => ({
  type: GET_OFFICIALS_FAILED,
  payload: data
})

export const createOfficials = (data: any) => async (dispatch: Dispatch) => {
  const { userData, playerData, navigate } = data;
  try {
    dispatch(start())
    // registers a user on the app
    const response = await http({
      method: "post",
      url: `/auth/register/`,
      data: userData
    })
    const { data } = response;
    //appending user._id to official data
    playerData.User = data.data._id;
    console.log(response.data, playerData)

    // registers a official after creating a user on the app
    const officialResponse = await privateHttp({
      method: "post",
      url: `/officials/official/register/`,
      data: playerData
    })
    const id = officialResponse.data.data._id;
    navigate(`/player/${id}`)
    return dispatch(postOfficialSuccess(officialResponse.data))
  } catch (error: any) {
    console.log(error)
    return dispatch(postOfficialFailed(error.response))
  }
}

export const getOfficials = () => async (dispatch: Dispatch) => {
  try {
      dispatch(getOfficialsStarted())
      const response = await privateHttp({
        method: "get",
        url: `/official/officials/`
      })
      const { data } = response;
      return dispatch(getOfficialsSuccess(data.data))
    } catch (error: any) {
      return dispatch(getOfficialsFailed(error.response))
    }
  }

  export const getOfficialById = (id: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(getOfficialStarted())
        const response = await privateHttp({
          method: "get",
          url: `/officials/official/`,
        })
        const { data } = response;
        return dispatch(getOfficialSuccess(data.data))
      } catch (error: any) {
        return dispatch(getOfficialFailed(error.response))
      }
    }