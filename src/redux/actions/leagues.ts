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
    POST_LEAGUE_FAILED,
    POST_LEAGUE_STAGE_STARTED,
    POST_LEAGUE_STAGE_SUCCESSFUL,
    POST_LEAGUE_STAGE_FAILED,
    GET_LEAGUE_STAGES_STARTED,
    GET_LEAGUE_STAGES_SUCCESSFUL,
    GET_LEAGUE_STAGES_FAILED,
    GET_LEAGUE_STAGE_STARTED,
    GET_LEAGUE_STAGE_SUCCESSFUL,
    GET_LEAGUE_STAGE_FAILED,
    UPDATE_LEAGUE_STARTED,
    UPDATE_LEAGUE_SUCCESSFUL,
    UPDATE_LEAGUE_FAILED,
    UPDATE_LEAGUE_STAGE_STARTED,
    UPDATE_LEAGUE_STAGE_SUCCESSFUL,
    UPDATE_LEAGUE_STAGE_FAILED
} from "./actionTypes";
import {privateHttp} from "../../baseUrl";
import { ErrorPopUp, SuccessPopUp } from "../../utils/toastify";

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

  const getleagueStagesStarted = () => ({
    type: GET_LEAGUE_STAGES_STARTED
  })

const getleagueStagesSuccess = (data: ILeague) => ({
    type: GET_LEAGUE_STAGES_SUCCESSFUL,
    payload: data
  })

const getleagueStagesFailed = (data: any) => ({
    type: GET_LEAGUE_STAGES_FAILED,
    payload: data
  })
  const getleagueStageStarted = () => ({
    type: GET_LEAGUE_STAGE_STARTED
  })

const getleagueStageSuccess = (data: ILeague) => ({
    type: GET_LEAGUE_STAGE_SUCCESSFUL,
    payload: data
  })

const getleagueStageFailed = (data: any) => ({
    type: GET_LEAGUE_STAGE_FAILED,
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

  const postleagueStageStarted = () => ({
    type: POST_LEAGUE_STAGE_STARTED
  })
  
  const postleagueStageSuccess = (data: ISeason) => ({
      type: POST_LEAGUE_STAGE_SUCCESSFUL,
      payload: data
    })
  
  const postleagueStageFailed = (data: any) => ({
      type: POST_LEAGUE_STAGE_FAILED,
      payload: data
    })

  const updateleagueStarted = () => ({
    type: UPDATE_LEAGUE_STARTED
  })
  
  const updateleagueSuccess = (data: ISeason) => ({
      type: UPDATE_LEAGUE_SUCCESSFUL,
      payload: data
    })
  
  const updateleagueFailed = (data: any) => ({
      type: UPDATE_LEAGUE_FAILED,
      payload: data
    });
    const updateleagueStageStarted = () => ({
      type: UPDATE_LEAGUE_STAGE_STARTED
    })
    
    const updateleagueStageSuccess = (data: ILeague) => ({
        type: UPDATE_LEAGUE_STAGE_SUCCESSFUL,
        payload: data
      })
    
    const updateleagueStageFailed = (data: any) => ({
        type: UPDATE_LEAGUE_STAGE_FAILED,
        payload: data
      });


export const getleagues = (id: any) => async (dispatch: Dispatch) => {
  try {
       dispatch(getleaguesStarted())
       const response = await privateHttp({
         method: "get",
         url: `/leagues/?Season=${id}`
       })
       const { data } = response;
       return dispatch(getleaguesSuccess(data.data))
     } catch (error: any) {
       return dispatch(getleaguesFailed(error.response))
     }
  }

export const getleague = (id: any) => async (dispatch: Dispatch) => {
    try {
        dispatch(getleagueStarted())
        const response = await privateHttp({
          method: "get",
          url: `/leagues/league/?_id=${id}`
        })
        const { data } = response;
        return dispatch(getleagueSuccess(data.data))
      } catch (error: any) {
        return dispatch(getleagueFailed(error.response))
      }
  }

export const getleagueStages = (id: any) => async (dispatch: Dispatch) => {
  try {
      dispatch(getleagueStagesStarted())
      const response = await privateHttp({
        method: "get",
        url: `/leagues/league/stages/?League=${id}`
      })
      const { data } = response;
      return dispatch(getleagueStagesSuccess(data.data))
    } catch (error: any) {
      return dispatch(getleagueStagesFailed(error.response))
    }
}

export const getleagueStage = (id: any) => async (dispatch: Dispatch) => {
  try {
      dispatch(getleagueStageStarted())
      const response = await privateHttp({
        method: "get",
        url: `/leagues/league/stages/stage/?_id=${id}`
      })
      const { data } = response;
      return dispatch(getleagueStageSuccess(data.data))
    } catch (error: any) {
      return dispatch(getleagueStageFailed(error.response))
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
      SuccessPopUp("League Successfully Created")
      return dispatch(postleagueSuccess(data))
    } catch (error: any) {
      ErrorPopUp(error.response.data.message)
      return dispatch(postleagueFailed(error.response))
    }
  }

export const postLeagueStage = (payload: any) => async (dispatch: Dispatch) => {
  try {
      dispatch(postleagueStageStarted())
      const response = await privateHttp({
        method: "post",
        url: `/leagues/league/stages/create/`,
        data: payload
      })
      const { data } = response;
      SuccessPopUp("Stage Successfully Created")
      return dispatch(postleagueStageSuccess(data))
    } catch (error: any) {
      ErrorPopUp(error.response.data.message)
      return dispatch(postleagueStageFailed(error.response))
    }
}

export const updateLeague = (payload: any) => async (dispatch: Dispatch) => {
  try {
      dispatch(updateleagueStarted())
      const response = await privateHttp({
        method: "patch",
        url: `/leagues/league/update/`,
        data: payload
      })
      const { data } = response;
      SuccessPopUp("League Successfully Updated")
      return dispatch(updateleagueSuccess(data))
    } catch (error: any) {
      ErrorPopUp(error.response.data.message)
      return dispatch(updateleagueFailed(error.response))
    }
}

export const updateLeagueStage = (payload: any) => async (dispatch: Dispatch) => {
  try {
          dispatch(updateleagueStageStarted())
          const response = await privateHttp({
            method: "patch",
            url: `/leagues/league/stage/update/`,
            data: payload
          })
          const { data } = response;
          SuccessPopUp("Stage Successfully Updated")
          return dispatch(updateleagueStageSuccess(data))
        } catch (error: any) {
          ErrorPopUp(error.response.data.message)
          return dispatch(updateleagueStageFailed(error.response))
        }
}

    