import { Dispatch } from "redux";
import {
  POST_PLAYER_FAILED,
  POST_PLAYER_STARTED,
  POST_PLAYER_SUCCESSFUL,
  GET_PLAYERS_STARTED,
  GET_PLAYERS_SUCCESSFUL,
  GET_PLAYERS_FAILED,
  GET_PLAYER_STARTED,
  GET_PLAYER_SUCCESSFUL,
  GET_PLAYER_FAILED,
  GET_PLAYER_LICENSE_STARTED,
  GET_PLAYER_LICENSE_SUCCESSFUL,
  GET_PLAYER_LICENSE_FAILED,
  UPDATE_PLAYER_STARTED,
  UPDATE_PLAYER_SUCCESSFUL,
  UPDATE_PLAYER_FAILED,
  DELETE_PLAYER_SUCCESSFUL,
  DELETE_PLAYER_STARTED,
  DELETE_PLAYER_FAILED,
  ACCREDIT_PLAYER_STARTED,
  ACCREDIT_PLAYER_SUCCESSFUL,
  ACCREDIT_PLAYER_FAILED
} from "./actionTypes";
import { privateHttp, http } from "../../baseUrl";
import { ErrorPopUp, SuccessPopUp } from "../../utils/toastify";

const start = () => ({
  type: POST_PLAYER_STARTED,
});

const postPlayerSuccess = (data: ITeam) => ({
  type: POST_PLAYER_SUCCESSFUL,
  payload: data,
});

const postPlayerFailed = (data: any) => ({
  type: POST_PLAYER_FAILED,
  payload: data,
});

const getPlayerStarted = () => ({
  type: GET_PLAYER_STARTED,
});

const getPlayerSuccess = (data: ITeam) => ({
  type: GET_PLAYER_SUCCESSFUL,
  payload: data,
});

const getPlayerFailed = (data: any) => ({
  type: GET_PLAYER_FAILED,
  payload: data,
});

const getPlayersStarted = () => ({
  type: GET_PLAYERS_STARTED,
});

const getPlayersSuccess = (data: ITeam) => ({
  type: GET_PLAYERS_SUCCESSFUL,
  payload: data,
});

const getPlayersFailed = (data: any) => ({
  type: GET_PLAYERS_FAILED,
  payload: data,
});

const getPlayerLicenseStarted = () => ({
  type: GET_PLAYER_LICENSE_STARTED,
});

const getPlayerLicenseSuccess = (data: ITeam) => ({
  type: GET_PLAYER_LICENSE_SUCCESSFUL,
  payload: data,
});

const getPlayerLicenseFailed = (data: any) => ({
  type: GET_PLAYER_LICENSE_FAILED,
  payload: data,
})

const updatePlayerStarted = () => ({
  type: UPDATE_PLAYER_STARTED,
});

const updatePlayerSuccess = (data: IPlayer) => ({
  type: UPDATE_PLAYER_SUCCESSFUL,
  payload: data,
});

const updatePlayerFailed = (data: any) => ({
  type: UPDATE_PLAYER_FAILED,
  payload: data,
});

const accredictPlayerStarted = () => ({
  type: ACCREDIT_PLAYER_STARTED
});

const accredictPlayerSuccess = (data: IPlayer) => ({
  type: ACCREDIT_PLAYER_SUCCESSFUL,
  payload: data,
});

const accredictPlayerFailed = (data: any) => ({
  type: ACCREDIT_PLAYER_FAILED,
  payload: data,
});

const deletePlayerStarted = () => ({
  type: DELETE_PLAYER_STARTED,
});

const deletePlayerSuccess = (data: IPlayer) => ({
  type: DELETE_PLAYER_SUCCESSFUL,
  payload: data,
});

const deletePlayerFailed = (data: any) => ({
  type: DELETE_PLAYER_FAILED,
  payload: data,
});

export const createPlayers = (data: any) => async (dispatch: Dispatch) => {
  const { userData, playerData, navigate } = data;
  try {
    dispatch(start());
    // registers a user on the app
    const response = await http({
      method: "post",
      url: `/auth/register/`,
      data: userData,
    });
    const { data } = response;
    //appending user._id to player data
    playerData.User = data?.data?.User._id;
    // registers a player after creating a user on the app
    const playerResponse = await privateHttp({
      method: "post",
      url: `/players_v2/player_v2/register/`,
      data: playerData
    });
    const id = playerResponse.data.data._id;
    if (playerResponse) {
      navigate(`/player_v2/${id}`);
    }
    SuccessPopUp("Player created Successfully")
    return dispatch(postPlayerSuccess(playerResponse.data));
  } catch (error: any) {
    ErrorPopUp(error.response.data.message)
    return dispatch(postPlayerFailed(error.response));
  }
};

export const getPlayers = (id: any) => async (dispatch: Dispatch) => {
  try {
    dispatch(getPlayersStarted());
    const response = await privateHttp({
      method: "get",
      url: `/players_v2/?Team=${id}`,
    });
    return dispatch(getPlayersSuccess(response.data.data));
  } catch (error: any) {
    return dispatch(getPlayersFailed(error.response));
  }
};

export const getPlayerById = (id: any) => async (dispatch: Dispatch) => {
  try {
    dispatch(getPlayerStarted());
    const response = await privateHttp({
      method: "get",
      url: `/players_v2/player/?_id=${id}`,
    });
    const { data } = response;
    return dispatch(getPlayerSuccess(data.data));
  } catch (error: any) {
    return dispatch(getPlayerFailed(error.response));
  }
};

export const updatePlayer = (playerData: any) => async (dispatch: Dispatch) => {
  try {
    dispatch(updatePlayerStarted());
    const response = await privateHttp({
      method: "patch",
      url: `/players_v2/player_v2/update/`,
      data: playerData,
    });
    const { data } = response;
    SuccessPopUp("Player details updated Successfully")
    return dispatch(updatePlayerSuccess(data));
  } catch (error: any) {
    ErrorPopUp(error.response.data.message)
    return dispatch(updatePlayerFailed(error.response));
  }
};

export const deletePlayerById = (id: any) => async (dispatch: Dispatch) => {
  try {
    dispatch(deletePlayerStarted());
    const response = await privateHttp({
      method: "get",
      url: `/players_v2/player_v2/remove/?_id=${id}`,
    });
    const { data } = response;
    SuccessPopUp("Player details deleted Successfully")
    return dispatch(deletePlayerSuccess(data.data));
  } catch (error: any) {
    ErrorPopUp(error.response.statusText)
    return dispatch(deletePlayerFailed(error.response));
  }
};

export const accredictPlayer = (playerData: any) => async (dispatch: Dispatch) => {
  try {
    dispatch(accredictPlayerStarted());
    const response = await privateHttp({
      method: "patch",
      url: `/players_v2/player_v2/accredit/`,
      data: playerData,
    });
    const { data } = response;
    SuccessPopUp("Player accredicted Successfully")
    return dispatch(accredictPlayerSuccess(data));
  } catch (error: any) {
    ErrorPopUp(error.response.data.message)
    return dispatch(accredictPlayerFailed(error.response));
  }
};

export const getPlayerLicense = (playerData: any) => async (dispatch: Dispatch) => {
  const {player, team} = playerData
  try {
    dispatch(getPlayerLicenseStarted());
    const response = await privateHttp({
      method: "get",
      url: `/players_v2/player_v2/license/?player_id=${player}&team_id=${team}`,
      data: playerData,
    });
    const { data } = response;
    // SuccessPopUp("Player details updated Successfully")
    return dispatch(getPlayerLicenseSuccess(data));
  } catch (error: any) {
    // ErrorPopUp(error.response.data.message)
    return dispatch(getPlayerLicenseFailed(error.response));
  }
};