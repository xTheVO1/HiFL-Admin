import {  POST_SEASON_STARTED,
          POST_SEASON_SUCCESSFUL,
          POST_SEASON_FAILED,
          GET_SEASON_STARTED,
          GET_SEASON_SUCCESSFUL,
          GET_SEASON_FAILED,
          GET_SEASONS_STARTED,
          GET_SEASONS_SUCCESSFUL,
          GET_SEASONS_FAILED
    } from "../actions/actionTypes";

const  initialState = {
  season:{},
  seasons:[],
  newSeason: {},
  loading: false,
  error: null
}

export const seasonReducer = (state: SeasonState = initialState, action: any):SeasonState => {
    switch(action.type) {
      case POST_SEASON_STARTED:
        return {
          ...state,
          loading: true
        }
      case POST_SEASON_SUCCESSFUL: 
        return {
          ...state,
          loading: false,
          newSeason: action.payload
        }
      case POST_SEASON_FAILED:
        return {
          ...state,
          loading: false,
          error: action.payload
        }
        case GET_SEASONS_STARTED:
          return {
            ...state,
            loading: true
          }
        case GET_SEASONS_SUCCESSFUL: 
          return {
            ...state,
            loading: false,
            seasons: action.payload
          }
        case GET_SEASONS_FAILED:
          return {
            ...state,
            loading: false,
            error: action.payload
          }
        case GET_SEASON_STARTED:
        return {
          ...state,
          loading: true
        }
        case GET_SEASON_SUCCESSFUL: 
          return {
            ...state,
            loading: false,
            season: action.payload
          }
        case GET_SEASON_FAILED:
          return {
            ...state,
            loading: false,
            error: action.payload
          }
    }
      return state;
}