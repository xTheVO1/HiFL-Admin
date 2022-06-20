import { Dispatch } from "redux";
import {
  GET_TEAMS_STARTED,
  GET_TEAMS_SUCCESSFUL,
  GET_TEAMS_FAILED,
  GET_TEAM_STARTED,
  GET_TEAM_SUCCESSFUL,
  GET_TEAM_FAILED,
  POST_TEAM_STARTED,
  POST_TEAM_SUCCESSFUL,
  POST_TEAM_FAILED,
  UPDATE_TEAM_STARTED,
  UPDATE_TEAM_SUCCESSFUL,
  UPDATE_TEAM_FAILED
} from "./actionTypes";
import { privateHttp } from "../../baseUrl";
import {ErrorPopUp, SuccessPopUp} from "../../utils/toastify";

const start = () => ({
  type: GET_TEAMS_STARTED,
});

const getTeamsSuccess = (data: ITeam) => ({
  type: GET_TEAMS_SUCCESSFUL,
  payload: data,
});

const getTeamsFailed = (data: any) => ({
  type: GET_TEAMS_FAILED,
  payload: data,
});

const getTeamByIdStart = () => ({
  type: GET_TEAM_STARTED,
});

const getTeamByIdSuccess = (data: ITeam) => ({
  type: GET_TEAM_SUCCESSFUL,
  payload: data,
});

const getTeamByIdFailed = (data: any) => ({
  type: GET_TEAM_FAILED,
  payload: data,
});

const postTeamStart = () => ({
  type: POST_TEAM_STARTED
});

const postTeamSuccess = (data: ITeam) => ({
  type: POST_TEAM_SUCCESSFUL,
  payload: data,
});

const postTeamFailed = (data: any) => ({
  type: POST_TEAM_FAILED,
  payload: data,
});

const updateTeamStart = () => ({
  type: UPDATE_TEAM_STARTED
});

const updateTeamSuccess = (data: ITeam) => ({
  type: UPDATE_TEAM_SUCCESSFUL,
  payload: data,
});

const updateTeamFailed = (data: any) => ({
  type: UPDATE_TEAM_FAILED,
  payload: data,
});

export const getTeams = () => async (dispatch: Dispatch) => {
  try {
    dispatch(start());
    const response = await privateHttp({
      method: "get",
      url: `/teams/all/`,
    });
    const { data } = response;
    return dispatch(getTeamsSuccess(data.data));
  } catch (error: any) {
    ErrorPopUp(error.response.data.message)
    return dispatch(getTeamsFailed(error.response));
  }
};

export const getTeamsByQuery = (id: any) => async (dispatch: Dispatch) => {
  try {
    dispatch(start());
    const response = await privateHttp({
      method: "get",
      url: `/teams/all/?TeamManagers=${id}`
    });
    const { data } = response;
    return dispatch(getTeamsSuccess(data.data));
  } catch (error: any) {
    ErrorPopUp(error.response.data.message)
    return dispatch(getTeamsFailed(error.response));
  }
};

export const postTeam = (payload: any) => async (dispatch: Dispatch) => {
  try {
    dispatch(postTeamStart());
    const response = await privateHttp({
      method: "post",
      url: `/teams/create/`,
      data: payload
    });
    const { data } = response;
    SuccessPopUp("Team Created Successfully")
    return dispatch(postTeamSuccess(data.data));
  } catch (error: any) {
    ErrorPopUp(error.response.data.message)
    return dispatch(postTeamFailed(error.response));
  }
};

export const updateTeam = (payload: any) => async (dispatch: Dispatch) => {
  try {
    dispatch(updateTeamStart());
    const response = await privateHttp({
      method: "patch",
      url: `/teams/team/update/`,
      data: payload
    });
    const { data } = response;
    SuccessPopUp("Team Updated Successfully")
    return dispatch(updateTeamSuccess(data.data));
  } catch (error: any) {
    ErrorPopUp(error.response.data.message)
    return dispatch(updateTeamFailed(error.response));
  }
};

export const getTeamById = (id: any) => async (dispatch: Dispatch) => {
  try {
    dispatch(getTeamByIdStart());
    const response = await privateHttp({
      method: "get",
      url: `/teams/team/?_id=${id}`
    });
    const { data } = response;
    return dispatch(getTeamByIdSuccess(data.data));
  } catch (error: any) {
    // ErrorPopUp(error.response.data.message)
    return dispatch(getTeamByIdFailed(error.response));
  }
};