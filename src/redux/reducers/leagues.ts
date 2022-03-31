import {  POST_LEAGUE_STARTED,
          POST_LEAGUE_SUCCESSFUL,
          POST_LEAGUE_FAILED,
          GET_LEAGUE_STARTED,
          GET_LEAGUE_SUCCESSFUL,
          GET_LEAGUE_FAILED,
          GET_LEAGUES_STARTED,
          GET_LEAGUES_SUCCESSFUL,
          GET_LEAGUES_FAILED
    } from "../actions/actionTypes";

const  initialState = {
  leagues: [],
  league: {},
  newLeague: {},
  loading: false,
  error: {}
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
        case GET_LEAGUES_STARTED:
          return {
            ...state,
            loading: true
          }
        case GET_LEAGUES_SUCCESSFUL: 
          return {
            ...state,
            loading: false,
            leagues: action.payload
          }
        case GET_LEAGUES_FAILED:
          return {
            ...state,
            loading: false,
            error: action.payload
          }
        case GET_LEAGUE_STARTED:
        return {
          ...state,
          loading: true
        }
        case GET_LEAGUE_SUCCESSFUL: 
          return {
            ...state,
            loading: false,
            league: action.payload
          }
        case GET_LEAGUE_FAILED:
          return {
            ...state,
            loading: false,
            error: action.payload
          }
    }
      return state;
}