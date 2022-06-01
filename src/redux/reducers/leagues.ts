import {  POST_LEAGUE_STARTED,
          POST_LEAGUE_SUCCESSFUL,
          POST_LEAGUE_FAILED,
          POST_LEAGUE_STAGE_STARTED,
          POST_LEAGUE_STAGE_SUCCESSFUL,
          POST_LEAGUE_STAGE_FAILED,
          GET_LEAGUE_STARTED,
          GET_LEAGUE_SUCCESSFUL,
          GET_LEAGUE_FAILED,
          GET_LEAGUES_STARTED,
          GET_LEAGUES_SUCCESSFUL,
          GET_LEAGUES_FAILED,
          GET_LEAGUE_STAGE_STARTED,
          GET_LEAGUE_STAGE_SUCCESSFUL,
          GET_LEAGUE_STAGE_FAILED,
          GET_LEAGUE_STAGES_STARTED,
          GET_LEAGUE_STAGES_SUCCESSFUL,
          GET_LEAGUE_STAGES_FAILED,
          UPDATE_LEAGUE_STARTED,
          UPDATE_LEAGUE_SUCCESSFUL,
          UPDATE_LEAGUE_FAILED
    } from "../actions/actionTypes";

const  initialState = {
  leagues: [],
  league: {},
  newLeague: {},
  newStage: {},
  loading: false,
  error: {},
  updatedLeague: {},
  leagueStage: {},
  leagueStages: [],
  leagueStageLoading: false,
  leagueStagesLoading: false,
  leaguesLoading: false,
  leagueLoading: false,
}

export const leagueReducer = (state: LeagueState = initialState, action: any):LeagueState => {
    switch(action.type) {
      case POST_LEAGUE_STARTED:
        return {
          ...state,
          loading: true
        }
      case POST_LEAGUE_SUCCESSFUL: 
        return {
          ...state,
          loading: false,
          newLeague: action.payload
        }
      case POST_LEAGUE_FAILED:
        return {
          ...state,
          loading: false,
          error: action.payload
        }
        case POST_LEAGUE_STAGE_STARTED:
          return {
            ...state,
            loading: true
          }
        case POST_LEAGUE_STAGE_SUCCESSFUL: 
          return {
            ...state,
            loading: false,
            newStage: action.payload
          }
        case POST_LEAGUE_STAGE_FAILED:
          return {
            ...state,
            loading: false,
            error: action.payload
          }
      case UPDATE_LEAGUE_STARTED:
        return {
          ...state,
          loading: true
        }
      case UPDATE_LEAGUE_SUCCESSFUL: 
        return {
          ...state,
          loading: false,
          updatedLeague: action.payload
        }
      case UPDATE_LEAGUE_FAILED:
        return {
          ...state,
          loading: false,
          error: action.payload
        }
        case GET_LEAGUES_STARTED:
          return {
            ...state,
            leaguesLoading: true
          }
        case GET_LEAGUES_SUCCESSFUL: 
          return {
            ...state,
            leaguesLoading: false,
            leagues: action.payload
          }
        case GET_LEAGUES_FAILED:
          return {
            ...state,
            leaguesLoading: false,
            error: action.payload
          }
        case GET_LEAGUE_STARTED:
        return {
          ...state,
          leagueLoading: true
        }
        case GET_LEAGUE_SUCCESSFUL: 
          return {
            ...state,
            leagueLoading: false,
            league: action.payload
          }
        case GET_LEAGUE_FAILED:
          return {
            ...state,
            leagueLoading: false,
            error: action.payload
          }
        case GET_LEAGUE_STAGE_STARTED:
          return {
            ...state,
            leagueStageLoading: true
          }
          case GET_LEAGUE_STAGE_SUCCESSFUL: 
            return {
              ...state,
              leagueStageLoading: false,
              leagueStage: action.payload
          }
          case GET_LEAGUE_STAGE_FAILED:
            return {
              ...state,
              leagueStageLoading: false,
              error: action.payload
          }
          case GET_LEAGUE_STAGES_STARTED:
          return {
            ...state,
            leagueStagesLoading: true
          }
          case GET_LEAGUE_STAGES_SUCCESSFUL: 
            return {
              ...state,
              leagueStagesLoading: false,
              leagueStages: action.payload
          }
          case GET_LEAGUE_STAGES_FAILED:
            return {
              ...state,
              leagueStagesLoading: false,
              error: action.payload
          }
    }
      return state;
}