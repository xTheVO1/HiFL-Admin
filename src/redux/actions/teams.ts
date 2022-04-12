import { Dispatch } from "redux";
import {
  GET_TEAMS_STARTED,
  GET_TEAMS_SUCCESSFUL,
  GET_TEAMS_FAILED,
} from "./actionTypes";
import { privateHttp } from "../../baseUrl";

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
    return dispatch(getTeamsFailed(error.response));
  }
};
