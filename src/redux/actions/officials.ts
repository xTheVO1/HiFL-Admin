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
  GET_OFFICIALS_FAILED,
  UPDATE_OFFICIAL_STARTED,
  UPDATE_OFFICIAL_SUCCESSFUL,
  UPDATE_OFFICIAL_FAILED,
  ACCREDIT_OFFICIAL_STARTED,
  ACCREDIT_OFFICIAL_SUCCESSFUL,
  ACCREDIT_OFFICIAL_FAILED
} from "./actionTypes";
import { privateHttp, http } from "../../baseUrl";
import { ErrorPopUp, SuccessPopUp } from "../../utils/toastify";

const start = () => ({
  type: POST_OFFICIAL_STARTED
})

const postOfficialSuccess = (data: IOfficial) => ({
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

const getOfficialSuccess = (data: IOfficial) => ({
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

const getOfficialsSuccess = (data: IOfficial) => ({
  type: GET_OFFICIALS_SUCCESSFUL,
  payload: data
})

const getOfficialsFailed = (data: any) => ({
  type: GET_OFFICIALS_FAILED,
  payload: data
})

const updateOfficerStarted = () => ({
  type: UPDATE_OFFICIAL_STARTED
})

const updateOfficialSuccess = (data: IOfficial) => ({
  type: UPDATE_OFFICIAL_SUCCESSFUL,
  payload: data
});

const updateOfficialFailed = (data: any) => ({
  type: UPDATE_OFFICIAL_FAILED,
  payload: data
});

const accreditOfficialStarted = () => ({
  type: ACCREDIT_OFFICIAL_STARTED
});

const accreditOfficialSuccess = (data: IPlayer) => ({
  type: ACCREDIT_OFFICIAL_SUCCESSFUL,
  payload: data,
});

const accreditOfficialFailed = (data: any) => ({
  type: ACCREDIT_OFFICIAL_FAILED,
  payload: data,
});

export const createOfficials = (data: any) => async (dispatch: Dispatch) => {
  const { userData, playerData, navigate } = data;
  try {
    dispatch(start())
    // registers a user on the app
    const response = await http({
      method: "post",
      url: `/auth/register/`,
      data: userData
    });

    const { data } = response;
    //appending user._id to official data
    playerData.User = data.data._id;

    // registers a official after creating a user on the app
    const officialResponse = await privateHttp({
      method: "post",
      url: `/officials/official/register/`,
      data: playerData
    })
    const id = officialResponse.data.data._id;
    navigate(`/official/${id}`)
    SuccessPopUp("Official created Successfully")
    return dispatch(postOfficialSuccess(officialResponse.data))
  } catch (error: any) {
    ErrorPopUp(error.response.data)
    return dispatch(postOfficialFailed(error.response))
  }
}

export const getOfficials = (id: any) => async (dispatch: Dispatch) => {
  try {
      dispatch(getOfficialsStarted())
      const response = await privateHttp({
        method: "get",
        url: `/officials/?Team=${id}`
      })
      const { data } = response;
      return dispatch(getOfficialsSuccess(data.data))
    } catch (error: any) {
      return dispatch(getOfficialsFailed(error.response))
    }
  }

export const getOfficialById = (id:any) => async (dispatch: Dispatch) => {
  try {
      dispatch(getOfficialStarted())
      const response = await privateHttp({
        method: "get",
        url: `/officials/official/?_id=${id}`,
      })
      const { data } = response;
      return dispatch(getOfficialSuccess(data.data))
    } catch (error: any) {
      return dispatch(getOfficialFailed(error.response))
    }
  }

export const updateOfficials = (officialData: any) => async (dispatch: Dispatch) => {
  try {
    dispatch(updateOfficerStarted())
    const response = await privateHttp({
      method: "patch",
      url: `/officials/official/update/`,
      data: officialData
    })
    const {data} = response;
    SuccessPopUp("Official updated Successfully")
    return dispatch(updateOfficialSuccess(data))
  } catch (error: any) {
    ErrorPopUp(error.response.data.message)
    return dispatch(updateOfficialFailed(error.response))
  }
}

export const accreditOfficial = (officialData: any) => async (dispatch: Dispatch) => {
  try {
    dispatch(accreditOfficialStarted())
    const response = await privateHttp({
      method: "patch",
      url: `/officials/official/accredict/`,
      data: officialData
    })
    const {data} = response;
    SuccessPopUp("Official updated Successfully")
    return dispatch(accreditOfficialSuccess(data))
  } catch (error: any) {
    ErrorPopUp(error.response.data.message)
    return dispatch(accreditOfficialFailed(error.response))
  }
}