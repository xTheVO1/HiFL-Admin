import { Dispatch } from "redux";
import { privateHttp } from "../../baseUrl";
import {ErrorPopUp, SuccessPopUp} from "../../utils/toastify";
import {
    GET_VOLUNTEERS_STARTED,
    GET_VOLUNTEERS_SUCCESSFUL,
    GET_VOLUNTEERS_FAILED,
    GET_VOLUNTEER_STARTED,
    GET_VOLUNTEER_SUCCESSFUL,
    GET_VOLUNTEER_FAILED,
    UPDATE_VOLUNTEER_STARTED,
    UPDATE_VOLUNTEER_SUCCESSFUL,
    UPDATE_VOLUNTEER_FAILED,
    POST_VOLUNTEER_STARTED,
    POST_VOLUNTEER_SUCCESSFUL,
    POST_VOLUNTEER_FAILED
} from "./actionTypes";

const getVolunteersStarted = () => ({
    type: GET_VOLUNTEERS_STARTED
})

const getVolunteersSuccess = (data: IVolunteer) => ({
    type: GET_VOLUNTEERS_SUCCESSFUL,
    payload: data
})

const getVolunteersFailed = (data: any) => ({
    type: GET_VOLUNTEERS_FAILED,
    payload: data
})

const getVolunteerStarted = () => ({
    type: GET_VOLUNTEER_STARTED
})

const getVolunteerSuccess = (data: IVolunteer) => ({
    type: GET_VOLUNTEER_SUCCESSFUL,
    payload: data
})

const getVolunteerFailed = (data: any) => ({
    type: GET_VOLUNTEER_FAILED,
    payload: data
})

const updateVolunteerStart = () => ({
    type: UPDATE_VOLUNTEER_STARTED
})

const updateVolunteerSuccess = (data: IVolunteer) => ({
    type: UPDATE_VOLUNTEER_SUCCESSFUL,
    payload: data
})

const updateVolunteerFailed = (data: any) => ({
    type: UPDATE_VOLUNTEER_FAILED,
    payload: data
})

const postVolunteerStart = () => ({
    type: POST_VOLUNTEER_STARTED
})

const postVolunteerSuccess = (data:IVolunteer) => ({
    type: POST_VOLUNTEER_SUCCESSFUL,
    payload: data
})

const postVolunteerFailed = (data: any) => ({
    type: POST_VOLUNTEER_FAILED,
    payload: data
})

export const getVolunteer = (id: any) => async (dispatch: Dispatch) => {
    try {
        dispatch(getVolunteerStarted())
        const response = await privateHttp({
            method: "get",
            url: `/volunteers/volunteer/?_id=${id}`
        })
        const { data } = response;
        return dispatch(getVolunteerSuccess(data.data))
    } catch (error: any) {
        return dispatch(getVolunteerFailed(error.response))
    }
}

export const getVolunteers = () => async (dispatch: Dispatch) => {
    try {
        dispatch(getVolunteersStarted())
        const response = await privateHttp({
            method: "get",
            url: `/volunteers/all/`
        })
        const { data } = response;
        return dispatch(getVolunteersSuccess(data))
    } catch (error: any) {
        return dispatch(getVolunteersFailed(error.response))
    }
}


export const updateVolunteer = (payload: any) => async (dispatch: Dispatch) => {
    try {
      dispatch(updateVolunteerStart());
      const response = await privateHttp({
        method: "patch",
        url: `/volunteers/volunteer/update/`,
        data: payload
      });
      const { data } = response;
      SuccessPopUp("Volunteer Updated Successfully")
      return dispatch(updateVolunteerSuccess(data.data));
    } catch (error: any) {
      ErrorPopUp(error.response.data.message)
      return dispatch(updateVolunteerFailed(error.response));
    }
  };

  export const postVolunteer = (payload: any) => async (dispatch: Dispatch) => {
    try {
      dispatch(postVolunteerStart());
      const response = await privateHttp({
        method: "post",
        url: `/volunteers/volunteer/create/`,
        data: payload
      });
      const { data } = response;
      SuccessPopUp("Volunteer Updated Successfully")
      return dispatch(postVolunteerSuccess(data.data));
    } catch (error: any) {
      ErrorPopUp(error.response.data.message)
      return dispatch(postVolunteerFailed(error.response));
    }
  };